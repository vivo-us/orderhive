import Orderhive from "../index";
import { ShippingMethod } from "../definitions/shipping";

export default async function listShippingMethods(
  this: Orderhive
): Promise<ShippingMethod[]> {
  try {
    const path = `/shipping/shippingmethods`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting shipping methods`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
