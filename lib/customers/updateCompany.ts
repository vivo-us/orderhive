import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Customer } from "../definitions/customers";

/**
 * @param  {number} companyId - Orderhive Customer ID
 * @return {Promise<Company>}
 */

export default async function updateCompany(
  this: Orderhive,
  companyId: number,
  data: object
): Promise<any> {
  await IdSchema.required().validateAsync(companyId);
  try {
    const path = `/orders/company/${companyId}`;
    const headers = await this.signRequest("PUT", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, data,  { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error updating company ${companyId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
