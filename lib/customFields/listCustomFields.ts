import Orderhive from "../index";
import { CustomField } from "../definitions/customFields";

/**
 * @return {Promise<CustomField[]>}
 */

export default async function listCustomFields(
  this: Orderhive
): Promise<CustomField[]> {
  try {
    const path = `/orders/customfield`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error getting custom fields list",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
