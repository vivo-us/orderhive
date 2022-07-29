import { IdSchema } from "../definitions/global";
import Orderhive from "../index";
import {
  EditInventoryResponse,
  EditInventory,
  EditInventorySchema,
} from "../definitions/inventory";

/**
 * @param  {number} productId - ID of the product to remove inventory from
 * @param  {EditInventory} editInventoryObj - Edit inventory object
 * @return {Promise<EditInventoryResponse>}
 */

export default async function editProductInventory(
  this: Orderhive,
  productId: number,
  editInventoryObj: EditInventory
): Promise<EditInventoryResponse> {
  await IdSchema.required().validateAsync(productId);
  let validatedObj = await EditInventorySchema.required().validateAsync(
    editInventoryObj
  );
  try {
    const path = `/product/stock/${productId}`;
    const headers = await this.signRequest("PUT", path, validatedObj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, validatedObj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error removing product inventory`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
