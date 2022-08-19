import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Customer } from "../definitions/customers";

/**
 * @param  {number} customerId - Orderhive Customer ID
 * @return {Promise<Customer>}
 */

export default async function getCustomerById(
  this: Orderhive,
  customerId: number
): Promise<Customer> {
  await IdSchema.required().validateAsync(customerId);
  try {
    const path = `/orders/customers/${customerId}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting order details for order ${customerId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
