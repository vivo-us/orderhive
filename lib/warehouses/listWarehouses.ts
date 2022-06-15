import Orderhive from "../index";
import { WarehousesListResponse } from "../definitions/warehouses";

/** *
 * @return {Promise<WarehousesListResponse>}
 */

export default async function listWarehouses(
  this: Orderhive
): Promise<WarehousesListResponse> {
  try {
    const path = `/setup/warehouse`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error fetching warehouse list`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
