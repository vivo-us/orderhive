import Orderhive from "../index";
import { EditOrderOptions, EditOrderSchema } from "../definitions/orders";
import { IdSchema } from "../definitions/global";

/**
 * @param  {number} orderId
 * @param  {EditOrderOptions} options
 */

export default async function editOrder(
  this: Orderhive,
  orderId: number,
  options: EditOrderOptions
) {
  await IdSchema.validateAsync(orderId);
  await EditOrderSchema.validateAsync(options);
  try {
    const path = `/orders/salesorder/${orderId}`;
    const headers = await this.signRequest("POST", path, options);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, options, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error editing order ${orderId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
