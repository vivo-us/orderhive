import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Customer } from "../definitions/customers";

/**
 * @param  {number} customerIds - Orderhive Customer ID
 * @return {Promise<Customer>}
 */

export default async function deleteCustomerById(
  this: Orderhive,
  customerIds: object
): Promise<Customer> {
  //await IdSchema.required().validateAsync(customerIds);
  try {
    const path = `/orders/customers/delete`;
    
    const headers = await this.signRequest("POST", path, customerIds);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, customerIds, { headers });
    this.logger.info(`Successfully deleted customer ${res.data.id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error deleting customer ID: ${customerIds}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
