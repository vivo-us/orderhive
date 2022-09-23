import Orderhive from "../index";
import { Order, CreateOrderSchema, CreateOrder } from "../definitions/orders";
import { IdArraySchema } from "../definitions/global";

/**
 * @param  {SalesOrderId} order - Orderhive Product ID
 * @return {Promise<Order>}
 */
//{sales_order_ids: ["161675706"]}
export default async function archiveOrder(
  this: Orderhive,
  data: object
): Promise<Order> {
  try {
    const path = "/orders/archiveorders/archive";
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
    this.logger.info(`Successfully archived order ${res.data.id}`);
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
