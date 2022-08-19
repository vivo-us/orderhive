import Orderhive from "../index";
import { CustomCompanyField, CreateCustomCompanyField, CreateCustomCompanyFieldSchema} from "../definitions/customFields";

/**
 * @param  {CreateCustomCompanyField} customCompanyField
 * @return {Promise<CustomCompanyField>}
 */

export default async function createCustomCompanyField(
  this: Orderhive,
  customCompanyField: CreateCustomCompanyField
): Promise<CustomCompanyField> {
  await CreateCustomCompanyFieldSchema.required().validateAsync(customCompanyField);
  try {
    const path = "/orders/company/customfield";
    const headers = await this.signRequest("POST", path, customCompanyField);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, customCompanyField, { headers });
    this.logger.info(`Successfully created custom company field ${res.data.id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error creating custom company field",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}