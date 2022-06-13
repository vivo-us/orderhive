import createOrder from "./createOrder";
import updateOrderStatus from "./updateOrderStatus";
import updateCustomOrderStatus from "./updateCustomOrderStatus";
import deleteOrders from "./deleteOrders";
import getOrderDetails from "./getOrderDetails";
import listCustomOrderStatuses from "./listCustomOrderStatuses";
import listOrders from "./listOrders";
import editOrder from "./editOrder";

export interface Address {
  name?: string | null;
  company?: string | null;
  address1: string;
  address2?: string | null;
  city: string;
  state: string;
  zipcode: string;
  country?: string | null;
  country_code: string;
  contact_number?: string | null;
  email?: string | null;
  default?: boolean;
  default_customer_address?: boolean;
}

export interface CustomField {
  id?: number;
  name: string;
  value: string | object | Array<string>;
  type: "DROP_DOWN" | "TEXT" | "DATE" | "CHECKBOX" | "NUMBER";
}

export interface Group {
  id: number;
  name: string;
  tax_rate: number;
  total_tax_value: number;
}

export interface TaxInfo {
  id: number;
  tax_rate: number;
  groups: Array<Group>;
}

export interface ProductImage {
  default_image: boolean;
  id: number;
  thumbnail: string;
  url: string;
}

export interface ItemWarehouse {
  available_qty: number;
  incoming_qty: number;
  outgoing_qty: number;
  warehouse_qty: number;
  warehouse_id: number;
  name: string;
}

export interface MetaData {
  key: string;
  label: string;
  name: string;
  type: string;
  value: string;
  valuesArray: Array<string>;
}

export interface OrderExtraItem {
  channel_description?: string;
  display_type?: string;
  name: string;
  price: number;
  quantity_available?: number;
  quantity_cancelled?: number;
  quantity_dropship?: number;
  quantity_invoiced?: number;
  quantity_ordered: number;
  quantity_packed?: number;
  quantity_shipped?: number;
  row_total?: number;
  tax_info?: TaxInfo;
  tax_percent: number;
  tax_value?: number;
  update_type?: "ADD" | "EDIT" | "REMOVE";
  weight?: number;
  weight_unit?: "KG" | "LB" | "GM" | "OZ";
}

export interface OrderItem {
  asin_number?: string | null;
  barcode?: string | null;
  brand?: string | null;
  category?: string | null;
  channel_primary_id?: string | null;
  channel_secondary_id?: string | null;
  components?: Array<any> | null;
  default_supplier_id?: number;
  discount_percent?: number;
  discount_type: "PERCENT" | "VALUE";
  discount_value?: number;
  id?: number;
  item_id: number;
  item_warehouse?: Array<ItemWarehouse> | null;
  last_purchase_price?: number;
  meta_data?: Array<MetaData> | null;
  name?: string | null;
  note?: string | null;
  price?: number;
  product_image?: ProductImage | null;
  properties?: Array<any> | null;
  quantity_ordered: number;
  quantity_cancelled?: number;
  quantity_shipped?: number;
  quantity_available?: number;
  quantity_on_hand?: number | null;
  quantity_returned?: number;
  quantity_delivered?: number;
  quantity_packed?: number;
  quantity_dropshipped?: number;
  quantity_invoiced?: number;
  row_total?: number;
  serial_numbers?: Array<string> | null;
  sku?: string | null;
  suppliers?: object;
  tax_info?: TaxInfo | null;
  tax_percent: number;
  tax_value?: number;
  type?: string | null;
  update_type?: "ADD" | "EDIT" | "REMOVE";
  weight?: number;
  weight_unit?: "KG" | "LB" | "GM" | "OZ" | null;
}

export type OrderStatus =
  | "CONFIRM"
  | "NOT_CONFIRM"
  | "SHIP"
  | "DELIVER"
  | "CANCEL";

export type PaymentStatus = "PAID" | "NOT_PAID" | "PARTIAL_PAID";

export interface Order {
  base_currency?: string | null;
  base_currency_rate?: number;
  billing_address: Address;
  channel_order_id?: string;
  channel_order_number?: string | null;
  config?: any;
  contact_id?: number | null;
  currency?: string;
  custom_fields?: Array<CustomField>;
  custom_pricing_tier_id?: number;
  custom_status?: number;
  delivery_date?: string | null;
  grand_total: number;
  id?: number;
  order_extra_items?: Array<OrderExtraItem>;
  order_items: Array<OrderItem>;
  order_status: OrderStatus;
  parent_id?: number | null;
  payment_method?: string | null;
  payment_status: PaymentStatus;
  preset_id?: number | null;
  reference_number?: string | null;
  remark?: string | null;
  sales_person_id?: number | null;
  shipping_address: Address;
  shipping_carrier?: string | null;
  shipping_due_date?: string | null;
  shipping_service?: string | null;
  store_id: number;
  sync_created?: string;
  tax_type: "INCLUSIVE" | "EXCLUSIVE";
  warehouse_id: number;
}

export default {
  createOrder,
  updateOrderStatus,
  updateCustomOrderStatus,
  deleteOrders,
  getOrderDetails,
  listCustomOrderStatuses,
  listOrders,
  editOrder,
};
