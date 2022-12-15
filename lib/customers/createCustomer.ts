import Orderhive from "../index";
import {
  Customer,
  CreateCustomerSchema,
  CreateCustomer,
} from "../definitions/customers";

/**
 * @param  {CreateCustomer} customer
 * @return {Promise<Customer>}
 */

export default async function createCustomer(
  this: Orderhive,
  customer: CreateCustomer
): Promise<Customer> {
  await CreateCustomerSchema.required().validateAsync(customer);
  console.log("CREATE CUSTOMER");
  try {
    const path = "/orders/customers/add";
    const headers = await this.signRequest("POST", path, customer);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, customer, { headers });
    this.logger.debug(`Successfully created customer ${res.data.id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error creating customer",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
