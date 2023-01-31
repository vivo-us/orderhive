import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Order } from "../definitions/orders";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @return {Promise<Order>}
 */

export default async function getOrderDetails(
  this: Orderhive,
  orderId: number
): Promise<Order> {
  await IdSchema.required().validateAsync(orderId);
  try {
    const path = `/orders/salesorder/${orderId}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting order details for order ${orderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
