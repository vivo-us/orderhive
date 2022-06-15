import { IdArraySchema } from "./../definitions/global";
import Orderhive from "../index";
import { ProductsInventory } from "../definitions/inventory";

/**
 * @param  {number[]} productIds - Array of Orderhive Product IDs
 * @return {Promise<ProductInventory[]>}
 */

export default async function getProductsInventory(
  this: Orderhive,
  productIds: number[]
): Promise<ProductsInventory[]> {
  await IdArraySchema.validateAsync(productIds);
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
