import Orderhive from "../index";
import {
  Company,
  CreateCompany,
  CreateCompanySchema,
} from "../definitions/customers";

/**
 * @param  {CreateCompany} company
 * @return {Promise<Company>}
 */

export default async function createCompany(
  this: Orderhive,
  company: CreateCompany
): Promise<Company> {
  await CreateCompanySchema.required().validateAsync(company);
  try {
    const path = "/orders/company/add";
    const headers = await this.signRequest("POST", path, company);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, company, { headers });
    this.logger.debug(`Successfully added company ${res.data.id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error creating company " + company.name,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
