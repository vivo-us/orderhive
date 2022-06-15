import Orderhive from "../index";
import {
  Product,
  CreateConfigurableProductMember,
} from "../definitions/products";

/**
 * @param  {number} productId
 * @param  {CreateConfigurableProductMember[]} members
 * @return {Promise<Product>}
 */

export default async function addConfigurableProductMember(
  this: Orderhive,
  productId: number,
  members: CreateConfigurableProductMember[]
): Promise<Product> {
  for (let member of members) {
    let hasOption = false;
    for (let each in member) {
      if (!each.includes("option")) continue;
      hasOption = true;
      break;
    }
    if (!hasOption) {
      throw new Error(
        "Configurable product members must have at least one option specified"
      );
    }
  }
  try {
    let obj = { members };
    const path = `/product/configurable/${productId}/variants`;
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error adding product(s) to configurable product ${productId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
