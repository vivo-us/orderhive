import Orderhive from "../index";
import { MessageResponse, IdArraySchema } from "../definitions/global";

/**
 * @param  {number[]} orderIds - Array of Orderhive Order IDs
 * @return {Promise<MessageResponse>}
 */

export default async function markOrderDelivered(
  this: Orderhive,
  orderIds: number[]
): Promise<MessageResponse> {
  await IdArraySchema.required().validateAsync(orderIds);
  try {
    let obj = { sales_order_id: orderIds };
    const path = `/shipping/shipments/deliver`;
    const headers = await this.signRequest("PUT", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error marking order(s) as delivered`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
