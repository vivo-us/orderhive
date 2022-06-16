import Orderhive from "../index";
import {
  SplitOrderData,
  SplitOrderResponse,
  SplitOrderDataSchema,
} from "../definitions/orders";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @param  {SplitOrderData} data - Split order data
 * @return {Promise<SplitOrderResponse>}
 */

export default async function splitOrder(
  this: Orderhive,
  orderId: number,
  data: SplitOrderData
): Promise<SplitOrderResponse> {
  await IdSchema.required().validateAsync(orderId);
  await SplitOrderDataSchema.required().validateAsync(data);
  try {
    const path = `/orders/salesorder/split/${orderId}`;
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error splitting order ${orderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
