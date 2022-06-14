import { SHA256, enc, HmacSHA256 } from "crypto-js";
import winston from "winston";
const { timestamp, combine, printf, cli } = winston.format;
import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import tags from "./tags/index";
import orders from "./orders/index";
import stores from "./stores/index";
import warehouses from "./warehouses/index";
import products from "./products/index";
import shipping from "./shipping/index";
import inventory from "./inventory/index";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type AxiosHeaders = Record<string, string>;
type LogLevel =
  | "error"
  | "warn"
  | "info"
  | "http"
  | "verbose"
  | "debug"
  | "silly";

interface OrderhiveConfig {
  idToken: string;
  refreshToken: string;
  loggingLevel?: LogLevel;
}

class Orderhive {
  OrderhiveError = class OrderhiveError extends Error {
    data: any;
    constructor(message: string, data?: any) {
      super(message);
      this.name = "OrderhiveError";
      this.data = data;
    }
  };
  private host: string = "api.orderhive.com";
  private idToken: string;
  private refreshToken: string;
  private accessKeyId: string | null = null;
  private secretKey: string | null = null;
  private sessionToken: string | null = null;
  logger: winston.Logger;
  http: AxiosInstance;

  createTag = tags.createTag.bind(this);
  addTag = tags.addTag.bind(this);
  listTags = tags.listTags.bind(this);

  createOrder = orders.createOrder.bind(this);
  updateOrderStatus = orders.updateOrderStatus.bind(this);
  updateCustomOrderStatus = orders.updateCustomOrderStatus.bind(this);
  deleteOrders = orders.deleteOrders.bind(this);
  getOrderDetails = orders.getOrderDetails.bind(this);
  listCustomStatuses = orders.listCustomStatuses.bind(this);
  listOrders = orders.listOrders.bind(this);
  editOrder = orders.editOrder.bind(this);
  getOrderJSON = orders.getOrderJSON.bind(this);
  splitOrder = orders.splitOrder.bind(this);
  moveOrderToFolder = orders.moveOrderToFolder.bind(this);
  addComment = orders.addComment.bind(this);

  listStores = stores.listStores.bind(this);
  getStoreDetails = stores.getStoreDetails.bind(this);

  listWarehouses = warehouses.listWarehouses.bind(this);
  getWarehouseDetails = warehouses.getWarehouseDetails.bind(this);

  createSimpleProduct = products.createSimpleProduct.bind(this);
  updateProduct = products.updateProduct.bind(this);
  deleteProduct = products.deleteProduct.bind(this);
  createBundleProduct = products.createBundleProduct.bind(this);
  createConfigurableProduct = products.createConfigurableProduct.bind(this);
  addConfigurableProductMember =
    products.addConfigurableProductMember.bind(this);
  getProductDetails = products.getProductDetails.bind(this);
  addProductSupplier = products.addProductSupplier.bind(this);
  updateProductSupplier = products.updateProductSupplier.bind(this);
  deleteProductSupplier = products.deleteProductSupplier.bind(this);
  getProductCatalog = products.getProductCatalog.bind(this);
  updateProductStock = products.updateProductStock.bind(this);
  searchProducts = products.searchProducts.bind(this);
  mapProducts = products.mapProducts.bind(this);

  getShipments = shipping.getShipments.bind(this);
  createShipment = shipping.createShipment.bind(this);
  createMultipieceShipment = shipping.createMultipieceShipment.bind(this);
  listShippingStores = shipping.listShippingStores.bind(this);
  markOrderDelivered = shipping.markOrderDelivered.bind(this);
  listShippingMethods = shipping.listShippingMethods.bind(this);
  listShippingPackageTypes = shipping.listShippingPackageTypes.bind(this);
  getLabelSettings = shipping.getLabelSettings.bind(this);
  getCustomsSettings = shipping.getCustomsSettings.bind(this);

  getWarehouseInventory = inventory.getWarehouseInventory.bind(this);
  getProductsInventory = inventory.getProductsInventory.bind(this);
  getProductInventory = inventory.getProductInventory.bind(this);
  constructor(config: OrderhiveConfig) {
    this.idToken = config.idToken;
    this.refreshToken = config.refreshToken;
    this.logger = winston.createLogger({
      level: config.loggingLevel || "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: combine(
            timestamp({ format: "HH:mm:ss:SSS" }),
            cli(),
            printf((info) => {
              return `${info.timestamp} ${info.level} ${info.message}`;
            })
          ),
        }),
      ],
    });
    this.http = axios.create({ baseURL: `https://${this.host}` });
    axiosRetry(this.http, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: async (error) => {
        let { response } = error;
        if (response?.status === 400) {
          this.logger.error("Bad request");
          return false;
        }
        if (response?.status === 401) {
          this.logger.error("Invalid credentials");
          return false;
        }
        if (response?.status === 403) {
          // @ts-ignore
          let retryCount = response.config["axios-retry"].retryCount || 0;
          if (
            retryCount >= 1 ||
            error.config.url?.includes("/setup/refreshtokenviaidtoken")
          ) {
            this.logger.error("Access denied");
            return false;
          }
          try {
            this.logger.warn("Access denied, trying to generate token");
            await this.generateToken();
            return true;
          } catch (error) {
            return false;
          }
        }
        if (response?.status === 404) {
          this.logger.error("Issue connecting to Orderhive");
          return false;
        }
        if (response?.status === 405) {
          this.logger.error("Method not allowed");
          return false;
        } else {
          this.logger.debug(
            `Retrying request: ${error.config.method} ${error.config.url}`
          );
          return true;
        }
      },
    });
  }

  generateToken = async () => {
    try {
      let res = await this.http.post(`/setup/refreshtokenviaidtoken`, {
        id_token: this.idToken,
        refresh_token: this.refreshToken,
      });
      this.accessKeyId = res.data.access_key_id;
      this.secretKey = res.data.secret_key;
      this.sessionToken = res.data.session_token;
      this.idToken = res.data.id_token;
      this.logger.info("Successfully generated token");
      return;
    } catch (error: any) {
      if (error.response) return error;
      this.logger.error(error.message);
      return error;
    }
  };

  signRequest = async (method: HttpMethod, path: string, payload: any = "") => {
    if (!this.accessKeyId || !this.secretKey || !this.sessionToken) {
      throw new Error(
        "The generateToken method must be called before signRequest"
      );
    }
    try {
      if (payload) payload = JSON.stringify(payload);
      let uri = path.includes("?")
        ? path.substring(0, path.indexOf("?"))
        : path;
      let query = path.includes("?")
        ? path.substring(path.indexOf("?") + 1)
        : "";
      query = query.replace(/:/g, "%3A");
      let date = new Date().toISOString().replace(/-|:/g, "");
      let shortDate = date.substring(0, date.indexOf("T"));
      let signDate = date.substring(0, date.indexOf("."));
      let hash = SHA256(payload).toString();
      let canonical = `${method}\n${uri}\n${query}\nhost:${this.host}\nid_token:${this.idToken}\nx-amz-date:${date}\nx-amz-security-token:${this.sessionToken}\n\nhost;id_token;x-amz-date;x-amz-security-token\n${hash}`;
      let hashedCanonical = SHA256(canonical).toString(enc.Hex);
      let stringToSign = `AWS4-HMAC-SHA256\n${signDate}Z\n${shortDate}/us-east-1/execute-api/aws4_request\n${hashedCanonical}`;
      let kDate = HmacSHA256(shortDate, "AWS4" + this.secretKey);
      let kRegion = HmacSHA256("us-east-1", kDate);
      let kService = HmacSHA256("execute-api", kRegion);
      let kSigning = HmacSHA256("aws4_request", kService);
      let signature = HmacSHA256(stringToSign, kSigning).toString(enc.Hex);
      let axiosConfig: AxiosHeaders = {
        "User-Agent":
          "VIVO Internal/0.4.0 (Langauge=Javascript; Platform=Linux)",
        host: this.host,
        id_token: this.idToken,
        "x-amz-date": date,
        Authorization: `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${shortDate}/us-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-date;id_token;x-amz-security-token, Signature=${signature}`,
        "x-amz-security-token": this.sessionToken,
      };
      return axiosConfig;
    } catch (error: any) {
      this.logger.error("AWS Signing error: " + error.message);
    }
  };
}

Orderhive.prototype.createTag = tags.createTag;
Orderhive.prototype.listTags = tags.listTags;
Orderhive.prototype.addTag = tags.addTag;

Orderhive.prototype.createOrder = orders.createOrder;
Orderhive.prototype.updateOrderStatus = orders.updateOrderStatus;
Orderhive.prototype.updateCustomOrderStatus = orders.updateCustomOrderStatus;
Orderhive.prototype.deleteOrders = orders.deleteOrders;
Orderhive.prototype.getOrderDetails = orders.getOrderDetails;
Orderhive.prototype.listCustomStatuses = orders.listCustomStatuses;
Orderhive.prototype.listOrders = orders.listOrders;
Orderhive.prototype.editOrder = orders.editOrder;
Orderhive.prototype.getOrderJSON = orders.getOrderJSON;
Orderhive.prototype.splitOrder = orders.splitOrder;
Orderhive.prototype.moveOrderToFolder = orders.moveOrderToFolder;
Orderhive.prototype.addComment = orders.addComment;

Orderhive.prototype.listStores = stores.listStores;
Orderhive.prototype.getStoreDetails = stores.getStoreDetails;

Orderhive.prototype.listWarehouses = warehouses.listWarehouses;
Orderhive.prototype.getWarehouseDetails = warehouses.getWarehouseDetails;

Orderhive.prototype.createSimpleProduct = products.createSimpleProduct;
Orderhive.prototype.updateProduct = products.updateProduct;
Orderhive.prototype.deleteProduct = products.deleteProduct;
Orderhive.prototype.createBundleProduct = products.createBundleProduct;
Orderhive.prototype.createConfigurableProduct =
  products.createConfigurableProduct;
Orderhive.prototype.addConfigurableProductMember =
  products.addConfigurableProductMember;
Orderhive.prototype.getProductDetails = products.getProductDetails;
Orderhive.prototype.addProductSupplier = products.addProductSupplier;
Orderhive.prototype.updateProductSupplier = products.updateProductSupplier;
Orderhive.prototype.deleteProductSupplier = products.deleteProductSupplier;
Orderhive.prototype.getProductCatalog = products.getProductCatalog;
Orderhive.prototype.updateProductStock = products.updateProductStock;
Orderhive.prototype.searchProducts = products.searchProducts;
Orderhive.prototype.mapProducts = products.mapProducts;

Orderhive.prototype.getShipments = shipping.getShipments;
Orderhive.prototype.createShipment = shipping.createShipment;
Orderhive.prototype.createMultipieceShipment =
  shipping.createMultipieceShipment;
Orderhive.prototype.markOrderDelivered = shipping.markOrderDelivered;
Orderhive.prototype.listShippingStores = shipping.listShippingStores;
Orderhive.prototype.listShippingMethods = shipping.listShippingMethods;
Orderhive.prototype.listShippingPackageTypes =
  shipping.listShippingPackageTypes;
Orderhive.prototype.getLabelSettings = shipping.getLabelSettings;
Orderhive.prototype.getCustomsSettings = shipping.getCustomsSettings;

Orderhive.prototype.getWarehouseInventory = inventory.getWarehouseInventory;
Orderhive.prototype.getProductsInventory = inventory.getProductsInventory;
Orderhive.prototype.getProductInventory = inventory.getProductInventory;
export default Orderhive;
