import Orderhive from "../index";
import { OrderStatus, OrderStatusSchema } from "../definitions/orders";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @param  {OrderStatus} orderStatus - Order status to set
 */

export default async function updateOrderStatus(
  this: Orderhive,
  orderId: number,
  orderStatus: OrderStatus
) {
  await IdSchema.required().validateAsync(orderId);
  await OrderStatusSchema.required().validateAsync(orderStatus);
  try {
    const path = "/orders/salesorder";
    let obj = {
      id: orderId,
      order_status: orderStatus,
    };
    const headers = await this.signRequest("PUT", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, obj, { headers });
    this.logger.info(res.data.message);
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error setting order ${orderId} status to ${orderStatus}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
