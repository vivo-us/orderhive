import Orderhive from "../index";
import { ShippingPackageType } from "../definitions/shipping";

/**
 * @return {Promise<ShippingPackageType[]>}
 */

export default async function listShippingPackageTypes(
  this: Orderhive
): Promise<ShippingPackageType[]> {
  try {
    const path = `/shipping/packagetypes`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting shipping package types`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
