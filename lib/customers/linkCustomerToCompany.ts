import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Customer, CustomerCompanyLink } from "../definitions/customers";

/**
 * @param  {number} CustomerCompanyLink - Orderhive Customer ID
 * @return {Promise<Customer>}
 */

export default async function linkCustomerToCompany(
  this: Orderhive,
  link: CustomerCompanyLink,
): Promise<any> {
  link.customer_ids.forEach(async (id) => {
    await IdSchema.required().validateAsync(id);
  });
  
  await IdSchema.required().validateAsync(link.company_id);
  try {
    const path = `/orders/customers/company/link`;
    const headers = await this.signRequest("POST", path, link);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path,link, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error linking customer ${link.customer_ids} to ${link.company_id}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
