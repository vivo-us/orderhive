import Orderhive from "../index";
import { Warehouse } from "../definitions/warehouses";
import { IdSchema } from "../definitions/global";

/** *
 * @param  {number} warehouseId
 * @return {Promise<Warehouse>}
 */

export default async function getWarehouseDetails(
  this: Orderhive,
  warehouseId: number
): Promise<Warehouse> {
  await IdSchema.required().validateAsync(warehouseId);
  try {
    const path = `/setup/warehouse/${warehouseId}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error fetching details for warehouse ${warehouseId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
