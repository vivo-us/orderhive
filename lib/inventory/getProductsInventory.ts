import Orderhive from "../index";
import { ProductsInventory } from "../definitions/inventory";

export default async function getProductsInventory(
  this: Orderhive,
  productIds: number[]
): Promise<ProductsInventory[]> {
  try {
    const obj = { ids: productIds };
    const path = `/product/warehouses`;
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    return res.data.products;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting product(s) inventory`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}