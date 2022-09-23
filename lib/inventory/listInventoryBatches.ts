import { ListBatchResponse } from "../definitions/inventory";
import Orderhive from "../index";

/** BatchResponse
 * @typedef {Object} BatchResponse
 * @property {string} created
 * @property {string} modified
 * @property {string} id
 * @property {string} batch
 * @property {Object} data
 * @property {string} data.batch_number
 * @property {string} data.status
 */

/**
 * @param  {number} page - Page number
 * @return {Promise<BatchResponse[]>}
 */

export default async function listInventoryBatches(
  this: Orderhive,
  page: number
): Promise<ListBatchResponse[]> {
  try {
    const path = `/product/inventorylevel/attributes?page=${page}&type=batch`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error getting batches list",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
