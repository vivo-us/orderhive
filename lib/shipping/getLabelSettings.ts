import Orderhive from "../index";
import { LabelSettings } from "../definitions/shipping";

export default async function getLabelSettings(
  this: Orderhive
): Promise<LabelSettings[]> {
  try {
    const path = `/shipping/labelsetting`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting label settings`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
