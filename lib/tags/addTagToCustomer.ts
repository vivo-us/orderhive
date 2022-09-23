import { IdArraySchema } from "../definitions/global";
import { TageTypeSchema } from "../definitions/tags";
import Orderhive from "../index";

type TagType = "customer";

/** *
 * @param  {number[]} orderIds - Orderhive Order IDs to add tags to
 * @param  {number[]} tagIds - Orderhive Tag IDs to add to orders
 * @param  {TagType} [type] - Type of tag to add to orders
 * @return {Promise<undefined>}
 */

export default async function addTagToCustomer(
  this: Orderhive,
  customerId: bigint,
  tagId: number[],
  type?: TagType
): Promise<undefined> {
  await IdArraySchema.required().validateAsync(customerId);
  await IdArraySchema.required().validateAsync(tagId);
  await TageTypeSchema.validateAsync(type);
  try {
    let obj = {
      source_id: customerId,
      tags: tagId,
    };
    if (!type) type = "customer";
    let path = `/orders/tags/${customerId}/${tagId}`;
    const headers = await this.signRequest("PUT", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, obj, { headers });
    this.logger.info(res.data.message);
    return;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError("Error adding tag", error.response.data);
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
