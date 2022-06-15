import Orderhive from "../index";
import {
  Product,
  CreateConfigurableProductMember,
  CreateConfigProductMemberSchema,
} from "../definitions/products";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} productId - Orderhive Product ID
 * @param  {CreateConfigurableProductMember[]} members - Array of members to add to the product
 * @return {Promise<Product>}
 */

export default async function addConfigurableProductMember(
  this: Orderhive,
  productId: number,
  members: CreateConfigurableProductMember[]
): Promise<Product> {
  await IdSchema.required().validateAsync(productId);
  await CreateConfigProductMemberSchema.required().validateAsync(members);
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
