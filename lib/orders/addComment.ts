import Orderhive from "../index";
import { AddCommentResponse } from "../definitions/orders";
import { IdSchema, QuerySchema } from "../definitions/global";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @param  {string} comment - Comment to add to the order
 * @return {Promise<AddCommentResponse>}
 */

export default async function addComment(
  this: Orderhive,
  orderId: number,
  comment: string
): Promise<AddCommentResponse> {
  await IdSchema.required().validateAsync(orderId);
  await QuerySchema.required().validateAsync(comment);
  try {
    let obj = {
      attachments: [],
      comment,
      linked_id: orderId,
      sub_users: [],
      type: "sales",
    };
    const path = `/orders/comments`;
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error adding comment to order ${orderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
