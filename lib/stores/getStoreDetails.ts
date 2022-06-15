import Orderhive from "../index";
import { Store } from "../definitions/stores";

/** *
 * @param  {number} storeId
 * @return {Promise<Store>}
 */

export default async function getStoreDetails(
  this: Orderhive,
  storeId: number
): Promise<Store> {
  try {
    const path = `/setup/store/${storeId}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error fetching details for store ${storeId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
