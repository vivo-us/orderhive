import Orderhive from "../index";
import {
  ProductSupplier,
  CreateProductSupplier,
  CreateProductSupplierSchema,
} from "../definitions/products";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} productId
 * @param  {CreateProductSupplier} data
 * @return {Promise<ProductSupplier>}
 */

export default async function updateProductSupplier(
  this: Orderhive,
  productId: number,
  data: CreateProductSupplier
): Promise<ProductSupplier> {
  await IdSchema.required().validateAsync(productId);
  await CreateProductSupplierSchema.required().validateAsync(data);
  try {
    const path = `/product/${productId}/supplier`;
    const headers = await this.signRequest("PUT", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error updating supplier for product ${productId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
