import Orderhive from "../index";
import { EditOrderOptions } from "../definitions/orders";

/**
 * @param  {number} orderId
 * @param  {EditOrderOptions} options
 */

export default async function editOrder(
  this: Orderhive,
  orderId: number,
  options: EditOrderOptions
) {
  if (options.order_items) {
    let sortedOrderItemsArray = options.order_items.sort((a, b) => {
      if (a.update_type === undefined || b.update_type === undefined) {
        throw new Error("Order items must have update_type");
      }
      let values = { ADD: 1, EDIT: 2, REMOVE: 3 };
      return values[a.update_type] - values[b.update_type];
    });
    options.order_items = sortedOrderItemsArray;
  }
  if (options.order_extra_items) {
    let sortedOrderItemsArray = options.order_extra_items.sort((a, b) => {
      if (a.update_type === undefined || b.update_type === undefined) {
        throw new Error("Order extra items must have update_type");
      }
      let values = { ADD: 1, EDIT: 2, REMOVE: 3 };
      return values[a.update_type] - values[b.update_type];
    });
    options.order_extra_items = sortedOrderItemsArray;
  }
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
