import Orderhive from "../index";
import {
  EditOrderOptions,
  EditOrderSchema,
  Order,
} from "../definitions/orders";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @param  {EditOrderOptions} options - Options for editing the order
 * @return {Promise<Order>}
 */

export default async function editOrder(
  this: Orderhive,
  orderId: number,
  options: EditOrderOptions
): Promise<Order> {
  await IdSchema.required().validateAsync(orderId);
  await EditOrderSchema.required().validateAsync(options);
  try {
    const path = `/orders/salesorder/${orderId}`;
    const headers = await this.signRequest("POST", path, options);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, options, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error editing order ${orderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
