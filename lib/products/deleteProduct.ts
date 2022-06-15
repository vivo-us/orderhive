import { IdArraySchema } from "./../definitions/global";
import Orderhive from "../index";
import { DeleteProductResponse } from "../definitions/products";

/**
 * @param  {number[]} productIds
 * @return {Promise<DeleteProductResponse>}
 */

export default async function deleteProduct(
  this: Orderhive,
  productIds: number[]
): Promise<DeleteProductResponse> {
  await IdArraySchema.required().validateAsync(productIds);
  try {
    const obj = { product_ids: productIds };
    const path = `/product/bulk/delete`;
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error deleting products`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
