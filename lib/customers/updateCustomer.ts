import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Customer, UpdateCustomer } from "../definitions/customers";

/**
 * @param  {number} customerId - Orderhive Customer ID
 * @return {Promise<Customer>}
 */

export default async function updateCustomer(
  this: Orderhive,
  customerId: bigint | number,
  data: UpdateCustomer
): Promise<Customer> {
  await IdSchema.required().validateAsync(customerId);
  try {
    const path = `/orders/customers/${customerId}`;
    const headers = await this.signRequest("PUT", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, data,  { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error updating customer details for customer ${customerId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
