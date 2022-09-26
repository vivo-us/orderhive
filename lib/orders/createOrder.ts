import Orderhive from "../index";
import { Order, CreateOrderSchema, CreateOrder } from "../definitions/orders";

/**
 * @param  {CreateOrder} order - Orderhive Product ID
 * @return {Promise<Order>}
 */

export default async function createOrder(
  this: Orderhive,
  order: CreateOrder
): Promise<Order> {
  await CreateOrderSchema.required().validateAsync(order);
  try {
    const path = "/orders/salesorder/add";
    const headers = await this.signRequest("POST", path, order);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, order, { headers });
    this.logger.debug(`Successfully created order ${res.data.id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error creating order",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
