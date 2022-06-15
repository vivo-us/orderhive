import Orderhive from "../index";
import { MessageResponse } from "../definitions/global";

/**
 * @param  {number[]} orderIds
 * @return {Promise<MessageResponse>}
 */

export default async function markOrderDelivered(
  this: Orderhive,
  orderIds: number[]
): Promise<MessageResponse> {
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
