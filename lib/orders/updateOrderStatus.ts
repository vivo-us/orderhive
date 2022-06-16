import Orderhive from "../index";
import { OrderStatus, OrderStatusSchema } from "../definitions/orders";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} orderId
 * @param  {OrderStatus} orderStatus
 */

export default async function updateOrderStatus(
  this: Orderhive,
  orderId: number,
  orderStatus: OrderStatus
) {
  await IdSchema.validateAsync(orderId);
  await OrderStatusSchema.validateAsync(orderStatus);
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
        "Error updating order status",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
