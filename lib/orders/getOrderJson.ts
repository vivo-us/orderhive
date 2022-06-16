import { IdSchema } from "../definitions/global";
import Orderhive from "../index";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @return {Promise<any>}
 */

export default async function getOrderJSON(
  this: Orderhive,
  orderId: number
): Promise<any> {
  await IdSchema.required().validateAsync(orderId);
  try {
    const path = `/orders/salesorder/${orderId}/getJson`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting order json for order ${orderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
