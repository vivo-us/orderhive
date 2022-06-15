import Orderhive from "../index";
import {
  Product,
  CreateSimpleProduct,
  CreateProductSchema,
} from "../definitions/products";

/**
 * @param  {CreateSimpleProduct} data
 * @return {Promise<Product>}
 */

export default async function createSimpleProduct(
  this: Orderhive,
  data: CreateSimpleProduct
): Promise<Product> {
  await CreateProductSchema.required().validateAsync(data);
  try {
    const path = `/product/simple`;
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error creating simple product`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
