import Orderhive from "../index";
import { ShippingStore } from "../definitions/shipping";

/**
 * @return {Promise<ShippingStore[]>}
 */

export default async function listShippingStores(
  this: Orderhive
): Promise<ShippingStore[]> {
  try {
    const path = `/shipping/shippingstores`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting shipping stores`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
