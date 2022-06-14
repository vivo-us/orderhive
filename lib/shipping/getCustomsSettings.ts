import Orderhive from "../index";
import { CustomsSettings } from "../definitions/shipping";

export default async function getCustomsSettings(
  this: Orderhive
): Promise<CustomsSettings[]> {
  try {
    const path = `/shipping/customsinformation`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting customs settings`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
