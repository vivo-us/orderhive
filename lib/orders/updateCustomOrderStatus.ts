import Orderhive from "../index";

/**
 * @param  {number[]} orderIds
 * @param  {number} customStatus
 */

export default async function updateCustomOrderStatus(
  this: Orderhive,
  orderIds: Array<number>,
  customStatus: number
) {
  try {
    const path = "/orders/salesorder/custom_status/change";
    let obj = {
      sales_order_ids: orderIds,
      custom_status: customStatus,
    };
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    this.logger.info(res.data.message);
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error updating order custom status",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
