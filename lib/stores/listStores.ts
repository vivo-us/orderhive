import Orderhive from "../index";
import { ListStoresResponse } from "../definitions/stores";

/** *
 * @return {Promise<ListStoresResponse>}
 */

export default async function listStores(
  this: Orderhive
): Promise<ListStoresResponse> {
  try {
    const path = `/setup/store`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error fetching stores`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
