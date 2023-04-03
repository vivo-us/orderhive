import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Invoices } from "../definitions/invoices";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @return {Promise<Order>}
 */

export default async function getInvoices(
  this: Orderhive,
  orderId: number
): Promise<Invoices> {
  await IdSchema.required().validateAsync(orderId);
  try {
    const path = `/orders/invoice/${orderId}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting invoice details for order ${orderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
