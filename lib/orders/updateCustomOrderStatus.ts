import { IdArraySchema, IdSchema } from "../definitions/global";
import Orderhive from "../index";

/**
 * @param  {number[]} orderIds - Array of Orderhive Order IDs
 * @param  {number} customStatusId - Orderhive Custom Status ID
 */

export default async function updateCustomOrderStatus(
  this: Orderhive,
  orderIds: Array<number>,
  customStatusId: number
) {
  await IdArraySchema.required().validateAsync(orderIds);
  await IdSchema.required().validateAsync(customStatusId);
  try {
    const path = "/orders/salesorder/custom_status/change";
    let obj = {
      sales_order_ids: orderIds,
      custom_status: customStatusId,
    };
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    this.logger.info(res.data.message);
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error updating custom status for order(s)`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
