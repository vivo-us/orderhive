import Orderhive from "../index";
import { Order } from "./index";

export default async function createOrder(this: Orderhive, order: Order) {
  if (order.id) throw new Error("Order ID is not allowed for create order");
  if (order.parent_id) {
    throw new Error("Parent ID is not allowed for create order");
  }
  if (order.config) throw new Error("Config is not allowed for create order");
  for (let each of order.order_items) {
    if (
      each.discount_type === "PERCENT" &&
      !each.discount_percent &&
      each.discount_percent !== 0
    ) {
      throw new Error("Discount percent is required for discount type PERCENT");
    } else if (
      each.discount_type === "VALUE" &&
      !each.discount_value &&
      each.discount_value !== 0
    ) {
      throw new Error("Discount value is required for discount type VALUE");
    }
    if (each.update_type) {
      throw new Error("update_type is not allowed for create order");
    }
    if (!each.quantity_ordered) {
      throw new Error("quantity_ordered is required and must be at least 1");
    }
    if (each.id) throw new Error("id is not allowed for create order");
  }
  if (order.order_extra_items) {
    for (let each of order.order_extra_items) {
      if (each.update_type) {
        throw new Error("update_type is not allowed for create order");
      }
      if (!each.quantity_ordered) {
        throw new Error("quantity_ordered is required and must be at least 1");
      }
    }
  }
  if (!order.billing_address.company && !order.billing_address.name) {
    throw new Error("Billing address name or company is required");
  }
  if (!order.shipping_address.company && !order.shipping_address.name) {
    throw new Error("Shipping address name or company is required");
  }
  try {
    const path = "/orders/salesorder/add";
    const headers = await this.signRequest("POST", path, order);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, order, { headers });
    this.logger.info(`Successfully created order ${res.data.id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error creating order",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
