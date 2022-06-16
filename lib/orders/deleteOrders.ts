import { IdArraySchema } from "./../definitions/global";
import Orderhive from "../index";

/**
 * @param  {number[]} orderIds
 */

export default async function deleteOrders(
  this: Orderhive,
  orderIds: Array<number>
) {
  await IdArraySchema.validateAsync(orderIds);
  try {
    const path = "/orders/salesorder/delete";
    let obj = { sales_orders_id: orderIds };
    const headers = await this.signRequest("PUT", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, obj, { headers });
    this.logger.info(res.data.message);
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error deleting order(s)",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
