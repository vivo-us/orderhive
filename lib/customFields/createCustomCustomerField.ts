import Orderhive from "../index";
import { CustomCustomerField, CreateCustomCustomerField, CreateCustomCustomerFieldSchema} from "../definitions/customFields";

/**
 * @param  {CreateCustomCustomerField} customCustomerField
 * @return {Promise<CustomCustomerField>}
 */

export default async function createCustomCustomerField(
  this: Orderhive,
  customCustomerField: CreateCustomCustomerField
): Promise<CustomCustomerField> {
  await CreateCustomCustomerFieldSchema.required().validateAsync(customCustomerField);
  try {
    const path = "/orders/customers/customfield";
    const headers = await this.signRequest("POST", path, customCustomerField);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, customCustomerField, { headers });
    this.logger.info(`Successfully created custom customer field ${res.data.id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error creating custom Customer field",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}