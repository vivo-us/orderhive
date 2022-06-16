import { IdArraySchema, QuerySchema } from "../definitions/global";
import Orderhive from "../index";

/**
 * @param  {number[]} orderIds
 * @param  {string} folderId
 * @return {Promise<undefined>}
 */

export default async function moveOrderToFolder(
  this: Orderhive,
  orderIds: number[],
  folderId: string
): Promise<undefined> {
  await IdArraySchema.validateAsync(orderIds);
  await QuerySchema.validateAsync(folderId);
  try {
    let obj = { id: orderIds };
    const path = `/orders/salesorder/mv_folder/${folderId}`;
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    await this.http.post(path, obj, { headers });
    return;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error moving order(s) to folder ${folderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
