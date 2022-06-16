import Orderhive from "../index";
import { ListOrdersOptions, ListOrderSchema } from "../definitions/orders";

/**
 * @param  {ListOrdersOptions} options
 */

export default async function listOrders(
  this: Orderhive,
  options: ListOrdersOptions
) {
  await ListOrderSchema.validateAsync(options);
  try {
    const path = `/orders/salesorder/v1`;
    const headers = await this.signRequest("POST", path, options);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, options, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error getting orders list",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
