import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Payment } from "../definitions/payments";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @return {Promise<[Payment]>}
 */

export default async function getPayment(
  this: Orderhive,
  orderId: number
): Promise<[Payment]> {
  await IdSchema.required().validateAsync(orderId);
  try {
    const path = `/orders/payment/${orderId}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting payment details for order ${orderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
