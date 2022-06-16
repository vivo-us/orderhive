import Orderhive from "../index";
import { ProductInventory } from "../definitions/inventory";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} productId - Orderhive Product ID
 * @return {Promise<ProductInventory[]>}
 */

export default async function getProductInventory(
  this: Orderhive,
  productId: number
): Promise<ProductInventory[]> {
  await IdSchema.required().validateAsync(productId);
  try {
    const path = `/product/${productId}/inventorylevel`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting product inventory for product ${productId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
