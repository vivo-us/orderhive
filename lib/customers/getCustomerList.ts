import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Customer } from "../definitions/customers";
import { options } from "joi";

/**
 * @param  {Array} FilterFields - Object with filters
 * @return {Promise<Customers>}
 */

export default async function getCustomerList(
  this: Orderhive,
  FilterFields: object
): Promise<any> {
  //await IdSchema.required().validateAsync(FilterFields);
  try {
    const path = `/orders/customers`;
    const headers = await this.signRequest("POST", path, FilterFields);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, FilterFields, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting customers by details for order ${FilterFields}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
