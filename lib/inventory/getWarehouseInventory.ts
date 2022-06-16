import { IdSchema } from "./../definitions/global";
import Orderhive from "../index";
import {
  GetWarehouseInventoryOptions,
  WarehouseInventoryReponse,
  WarehouseInventorySchema,
} from "../definitions/inventory";

/**
 * @param  {number} warehouseId - Orderhive Warehouse ID
 * @param  {GetWarehouseInventoryOptions} [options] - Options for the request
 * @return {Promise<WarehouseInventoryReponse>}
 */

export default async function getWarehouseInventory(
  this: Orderhive,
  warehouseId: number,
  options?: GetWarehouseInventoryOptions
): Promise<WarehouseInventoryReponse> {
  await IdSchema.required().validateAsync(warehouseId);
  await WarehouseInventorySchema.validateAsync(options);
  try {
    let obj = {
      warehouse_id: warehouseId,
      page: options?.page || 1,
      sort: "product_warehouses.inventory_levels.location",
      direction: options?.direction || "-1",
      logo: false,
      limit: options?.limit || 50,
    };
    const path = `/reports/inventorybylocation`;
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting inventory for warehouse ${warehouseId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
