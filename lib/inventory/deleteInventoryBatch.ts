import Orderhive from "../index";

/**
 * @param  {string} inventoryBatchId - Inventory Batch Id returned from Orderhive
 * @return {Promise<void>}
 */

export default async function deleteInventoryBatch(
  this: Orderhive,
  inventoryBatchId: string
): Promise<void> {
  try {
    const path = `/product/inventorylevel/attribute/${inventoryBatchId}`;
    const headers = await this.signRequest("DELETE", path);
    if (!headers) throw new Error("Could not sign request");
    await this.http.delete(path, { headers });
    return;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error deleteing batch ${inventoryBatchId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
