import Orderhive from "../index";
import {
  Product,
  CreateConfigurableProduct,
  CreateConfigurableProductSchema,
} from "../definitions/products";

/**
 * @param  {CreateConfigurableProduct} data - Data for creating a configurable product
 * @return {Promise<Product>}
 */

export default async function createBundleProduct(
  this: Orderhive,
  data: CreateConfigurableProduct
): Promise<Product> {
  await CreateConfigurableProductSchema.required().validateAsync(data);
  try {
    const path = `/product/configurable`;
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error creating configurable product`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
