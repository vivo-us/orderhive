import { Address, Timestamps, Weight } from "./global";

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

export interface OrderExtraItem extends Weight {
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
}

export interface OrderItem extends Weight {
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

interface SplitItem {
  id: number;
  qty_split: number;
}

export interface SplitOrderData {
  split_items: Array<SplitItem>;
  channel_order_number?: string;
}

export interface SplitOrderResponse {
  id: number;
}

interface Subuser {
  id: number;
  name: string;
  image: ProductImage | null;
  timezone: string | null;
  username: string;
  user_details: string | null;
  role_id: number;
}

export interface AddCommentResponse extends Timestamps {
  id: number;
  comment: string;
  read_on: string;
  is_read: boolean;
  userId: number;
  tenantId: number;
  sub_users: Subuser[];
  sales_order_id: number;
  user_name: string;
  type: string;
  attachments: [];
  linked_id: string;
}

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

export interface ListOrdersOptions {
  filters?: Filter;
  sortBy?: Sort;
  query?: string;
  nextToken?: string;
}

export interface EditOrderOptions {
  contact_id?: number;
  channel_order_number?: string;
  payment_method?: string;
  reference_number?: string;
  sales_person_id?: number;
  remark?: string;
  delivery_date?: string;
  shipping_carrier?: string;
  shipping_service?: string;
  shipping_address?: Address;
  billing_address?: Address;
  preset_id?: number;
  order_extra_items?: Array<OrderExtraItem>;
  order_items?: Array<OrderItem>;
}
