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
import { Model, Sequelize, DataTypes, Optional, Op } from "sequelize";
import CryptoJS from "crypto-js";

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

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  encryptionKey: string;
}
interface OrderhiveConfig {
  idToken: string;
  refreshToken: string;
  db: DatabaseConfig;
  loggingLevel?: LogLevel;
}

interface OrderhiveApiTokenAttributes {
  id: number;
  accessKeyId: string;
  secretKey: string;
  sessionToken: string;
  idToken: string;
  expirationDate: Date;
}

interface OrderhiveApiTokenInput
  extends Optional<OrderhiveApiTokenAttributes, "id"> {}
interface OrderhiveApiTokenOutput
  extends Required<OrderhiveApiTokenAttributes> {}

class OrderhiveApiToken
  extends Model<OrderhiveApiTokenAttributes, OrderhiveApiTokenInput>
  implements OrderhiveApiTokenAttributes
{
  id!: number;
  accessKeyId!: string;
  secretKey!: string;
  sessionToken!: string;
  idToken!: string;
  expirationDate!: Date;
}

/**
 * @param {OrderhiveConfig} config - Object containing Orderhive ID Token and Refresh Token, as well as logging level
 */

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
  private tokenExpiration: Date | null = null;
  private encryptionKey: string;
  ready: boolean = false;
  logger: winston.Logger;
  http: AxiosInstance;
  database: Sequelize;
  OrderhiveApiToken = OrderhiveApiToken;

  createTag: typeof tags.createTag = tags.createTag.bind(this);
  addTag: typeof tags.addTag = tags.addTag.bind(this);
  listTags: typeof tags.listTags = tags.listTags.bind(this);

  createOrder: typeof orders.createOrder = orders.createOrder.bind(this);
  updateOrderStatus: typeof orders.updateOrderStatus =
    orders.updateOrderStatus.bind(this);
  updateCustomOrderStatus: typeof orders.updateCustomOrderStatus =
    orders.updateCustomOrderStatus.bind(this);
  deleteOrders: typeof orders.deleteOrders = orders.deleteOrders.bind(this);
  getOrderDetails: typeof orders.getOrderDetails =
    orders.getOrderDetails.bind(this);
  listCustomStatuses: typeof orders.listCustomStatuses =
    orders.listCustomStatuses.bind(this);
  listOrders: typeof orders.listOrders = orders.listOrders.bind(this);
  editOrder: typeof orders.editOrder = orders.editOrder.bind(this);
  getOrderJSON: typeof orders.getOrderJSON = orders.getOrderJSON.bind(this);
  splitOrder: typeof orders.splitOrder = orders.splitOrder.bind(this);
  moveOrderToFolder: typeof orders.moveOrderToFolder =
    orders.moveOrderToFolder.bind(this);
  addComment: typeof orders.addComment = orders.addComment.bind(this);
  removeTag: typeof orders.removeTag = orders.removeTag.bind(this);

  listStores: typeof stores.listStores = stores.listStores.bind(this);
  getStoreDetails: typeof stores.getStoreDetails =
    stores.getStoreDetails.bind(this);

  listWarehouses: typeof warehouses.listWarehouses =
    warehouses.listWarehouses.bind(this);
  getWarehouseDetails: typeof warehouses.getWarehouseDetails =
    warehouses.getWarehouseDetails.bind(this);

  createSimpleProduct: typeof products.createSimpleProduct =
    products.createSimpleProduct.bind(this);
  updateProduct: typeof products.updateProduct =
    products.updateProduct.bind(this);
  deleteProduct: typeof products.deleteProduct =
    products.deleteProduct.bind(this);
  createBundleProduct: typeof products.createBundleProduct =
    products.createBundleProduct.bind(this);
  createConfigurableProduct: typeof products.createConfigurableProduct =
    products.createConfigurableProduct.bind(this);
  addConfigurableProductMember: typeof products.addConfigurableProductMember =
    products.addConfigurableProductMember.bind(this);
  getProductDetails: typeof products.getProductDetails =
    products.getProductDetails.bind(this);
  addProductSupplier: typeof products.addProductSupplier =
    products.addProductSupplier.bind(this);
  updateProductSupplier: typeof products.updateProductSupplier =
    products.updateProductSupplier.bind(this);
  deleteProductSupplier: typeof products.deleteProductSupplier =
    products.deleteProductSupplier.bind(this);
  getProductCatalog: typeof products.getProductCatalog =
    products.getProductCatalog.bind(this);
  updateProductStock: typeof products.updateProductStock =
    products.updateProductStock.bind(this);
  searchProducts: typeof products.searchProducts =
    products.searchProducts.bind(this);
  mapProducts: typeof products.mapProducts = products.mapProducts.bind(this);

  getShipments: typeof shipping.getShipments = shipping.getShipments.bind(this);
  createShipment: typeof shipping.createShipment =
    shipping.createShipment.bind(this);
  createMultipieceShipment: typeof shipping.createMultipieceShipment =
    shipping.createMultipieceShipment.bind(this);
  listShippingStores: typeof shipping.listShippingStores =
    shipping.listShippingStores.bind(this);
  markOrderDelivered: typeof shipping.markOrderDelivered =
    shipping.markOrderDelivered.bind(this);
  listShippingMethods: typeof shipping.listShippingMethods =
    shipping.listShippingMethods.bind(this);
  listShippingPackageTypes: typeof shipping.listShippingPackageTypes =
    shipping.listShippingPackageTypes.bind(this);
  getLabelSettings: typeof shipping.getLabelSettings =
    shipping.getLabelSettings.bind(this);
  getCustomsSettings: typeof shipping.getCustomsSettings =
    shipping.getCustomsSettings.bind(this);

  getWarehouseInventory: typeof inventory.getWarehouseInventory =
    inventory.getWarehouseInventory.bind(this);
  getProductsInventory: typeof inventory.getProductsInventory =
    inventory.getProductsInventory.bind(this);
  getProductInventory: typeof inventory.getProductInventory =
    inventory.getProductInventory.bind(this);
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
    let { db } = config;
    this.encryptionKey = config.db.encryptionKey;
    this.database = new Sequelize(db.database, db.username, db.password, {
      logging: false,
      dialect: "mysql",
      dialectOptions: {
        port: db.port,
        host: db.host,
        multipleStatements: true,
      },
      pool: {
        max: 100,
        min: 0,
        idle: 10000,
        acquire: 30000,
      },
    });
    this.init()
      .then(() => (this.ready = true))
      .catch((err) => {
        throw new this.OrderhiveError(
          "An error occurred while initializing database",
          err
        );
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

  init = async () => {
    let self = this;
    this.OrderhiveApiToken.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        accessKeyId: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value: string) {
            let encrypted = CryptoJS.AES.encrypt(
              value.trim(),
              self.encryptionKey
            );
            this.setDataValue("accessKeyId", encrypted.toString());
          },
          get() {
            let decrypted = CryptoJS.AES.decrypt(
              this.getDataValue("accessKeyId"),
              self.encryptionKey
            );
            return decrypted.toString(CryptoJS.enc.Utf8);
          },
        },
        secretKey: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value: string) {
            let encrypted = CryptoJS.AES.encrypt(
              value.trim(),
              self.encryptionKey
            );
            this.setDataValue("secretKey", encrypted.toString());
          },
          get() {
            let decrypted = CryptoJS.AES.decrypt(
              this.getDataValue("secretKey"),
              self.encryptionKey
            );
            return decrypted.toString(CryptoJS.enc.Utf8);
          },
        },
        sessionToken: {
          type: DataTypes.TEXT,
          allowNull: false,
          set(value: string) {
            let encrypted = CryptoJS.AES.encrypt(
              value.trim(),
              self.encryptionKey
            );
            this.setDataValue("sessionToken", encrypted.toString());
          },
          get() {
            let decrypted = CryptoJS.AES.decrypt(
              this.getDataValue("sessionToken"),
              self.encryptionKey
            );
            return decrypted.toString(CryptoJS.enc.Utf8);
          },
        },
        idToken: {
          type: DataTypes.TEXT,
          allowNull: false,
          set(value: string) {
            let encrypted = CryptoJS.AES.encrypt(
              value.trim(),
              self.encryptionKey
            );
            this.setDataValue("idToken", encrypted.toString());
          },
          get() {
            let decrypted = CryptoJS.AES.decrypt(
              this.getDataValue("idToken"),
              self.encryptionKey
            );
            return decrypted.toString(CryptoJS.enc.Utf8);
          },
        },
        expirationDate: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize: this.database,
        modelName: "orderhiveApiTokens",
      }
    );
    await this.OrderhiveApiToken.sync();
  };

  generateToken = async () => {
    let retries = 0;
    while (!this.ready && retries < 3) {
      retries++;
      await new Promise((resolve) => setTimeout(resolve, (retries + 1) * 1000));
    }
    if (!this.ready) {
      throw new this.OrderhiveError(
        "Orderhive is not ready. Could not initialize database. Please check your configuration."
      );
    }
    try {
      let date = new Date();
      if (
        this.tokenExpiration &&
        this.tokenExpiration.getTime() > new Date().getTime() + 1000 * 60 * 5
      ) {
        this.logger.debug("Using previously generated token");
        return;
      }
      let tokens = await this.OrderhiveApiToken.findOne({
        where: {
          expirationDate: {
            [Op.gt]: new Date(date.getTime() + 1000 * 60 * 5),
          },
        },
      });
      if (tokens) {
        let { accessKeyId, secretKey, sessionToken, idToken, expirationDate } =
          tokens.toJSON();
        this.accessKeyId = accessKeyId;
        this.secretKey = secretKey;
        this.sessionToken = sessionToken;
        this.idToken = idToken;
        this.tokenExpiration = expirationDate;
        this.logger.info("Using cached token");
        return;
      } else {
        let res = await this.http.post(`/setup/refreshtokenviaidtoken`, {
          id_token: this.idToken,
          refresh_token: this.refreshToken,
        });
        this.accessKeyId = res.data.access_key_id;
        this.secretKey = res.data.secret_key;
        this.sessionToken = res.data.session_token;
        this.idToken = res.data.id_token;
        this.tokenExpiration = new Date(date.getTime() + 1000 * 60 * 60);
        this.logger.info("Successfully generated token");
        await this.OrderhiveApiToken.create({
          accessKeyId: res.data.access_key_id,
          secretKey: res.data.secret_key,
          sessionToken: res.data.session_token,
          idToken: res.data.id_token,
          expirationDate: new Date(date.getTime() + 1000 * 60 * 60),
        });
        return;
      }
    } catch (error: any) {
      if (error.response) return error;
      this.logger.error(error.message);
      return error;
    }
  };

  /**
   *
   * @param {HttpMethod} method - HTTP method for the request
   * @param {string} path - Path for the request
   * @param {any} payload - Payload for the request
   */

  signRequest = async (method: HttpMethod, path: string, payload: any = "") => {
    await this.generateToken();
    if (!this.accessKeyId || !this.secretKey || !this.sessionToken) {
      throw new Error(
        "Tokens were not generated correctly, please check your credentials"
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
export default Orderhive;
