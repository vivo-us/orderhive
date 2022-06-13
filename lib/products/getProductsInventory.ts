import { ProductWarehouse, ProductType } from "./definitions";
import Orderhive from "../index";

interface ProductInventory {
  id: number;
  archived: boolean;
  updated: boolean;
  type: ProductType;
  product_warehouses: ProductWarehouse[];
}

interface ProductsInventoryReturn {
  products: ProductInventory[];
}

export default async function getProductsInventory(
  this: Orderhive,
  productIds: number[]
): Promise<ProductsInventoryReturn> {
  try {
    const obj = {
      ids: productIds,
    };
    const path = `/product/warehouses`;
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting products inventory`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
