import Orderhive from "../index";
import {
  Product,
  UpdateProduct,
  UpdateProductSchema,
} from "../definitions/products";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} productId - Orderhive Product ID
 * @param  {UpdateProduct} data - Data to update the product with
 * @return {Promise<Product>}
 */

export default async function updateProduct(
  this: Orderhive,
  productId: number,
  data: UpdateProduct
): Promise<Product> {
  await IdSchema.required().validateAsync(productId);
  await UpdateProductSchema.required().validateAsync(data);
  try {
    const path = `/product/${productId}`;
    const headers = await this.signRequest("PUT", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error updating product ${productId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
