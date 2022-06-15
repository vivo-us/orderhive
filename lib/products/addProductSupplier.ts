import { IdSchema } from "./../definitions/global";
import Orderhive from "../index";
import {
  ProductSupplier,
  CreateProductSupplier,
  CreateProductSupplierSchema,
} from "../definitions/products";

/**
 * @param  {number} productId - Orderhive Product ID
 * @param  {CreateProductSupplier} data - Data to add the product supplier
 * @return {Promise<ProductSupplier>}
 */

export default async function addSupplierToProduct(
  this: Orderhive,
  productId: number,
  data: CreateProductSupplier
): Promise<ProductSupplier> {
  await IdSchema.required().validateAsync(productId);
  await CreateProductSupplierSchema.required().validateAsync(data);
  try {
    const path = `/product/${productId}/supplier`;
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error adding supplier to product ${productId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
