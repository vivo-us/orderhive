import Orderhive from "../index";
import { Product, CreateConfigurableProduct } from "../definitions/products";

/**
 * @param  {CreateConfigurableProduct} data
 * @return {Promise<Product>}
 */

export default async function createBundleProduct(
  this: Orderhive,
  data: CreateConfigurableProduct
): Promise<Product> {
  for (let each of data.product_options) {
    for (let member of data.members) {
      if (member[`option${each.position}`]) continue;
      throw new Error(
        `Missing option${each.position} to match product option ${each.name}`
      );
    }
  }
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
