import Orderhive from "../index";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @param  {number} tagId - Orderhive Tag ID
 * @return {Promise<undefined>}
 */

export default async function getOrderDetails(
  this: Orderhive,
  orderId: number,
  tagId: number
): Promise<undefined> {
  await IdSchema.required().validateAsync(orderId);
  await IdSchema.required().validateAsync(tagId);
  try {
    const path = `/orders/tags/sales_order/${orderId}/${tagId}`;
    const headers = await this.signRequest("DELETE", path);
    if (!headers) throw new Error("Could not sign request");
    await this.http.delete(path, { headers });
    return;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error deleting tag ${tagId} from order ${orderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
