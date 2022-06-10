import Orderhive from "../index";
import { PaymentStatus } from "./index";

interface Filter {
  custom_status?: Array<number>;
  storesByIds?: Array<number>;
  tagsByNames?: Array<string>;
  shipping_country?: Array<string>;
  payment_status?: Array<PaymentStatus>;
  from_date?: string;
  to_date?: string;
  warehousesByIds?: Array<number>;
  shipping_service?: Array<string>;
  shipping_carrier?: Array<string>;
  pending_invoice?: boolean;
  invoice_printed?: boolean;
  from_due_date?: string;
  to_due_date?: string;
}

interface Sort {
  property: string;
  direction: "ASC" | "DESC";
}

interface Options {
  filters?: Filter;
  sortBy?: Sort;
  query?: string;
  nextToken?: string;
}

export default async function listOrders(this: Orderhive, options: Options) {
  if (options.filters?.from_due_date && !options.filters?.to_due_date) {
    throw new Error("from_due_date requires to_due_date");
  }
  if (options.filters?.from_date && !options.filters?.to_date) {
    throw new Error("from_date requires to_date");
  }
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
