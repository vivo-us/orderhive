import {
  Address,
  CustomField,
  OrderExtraItem,
  OrderItem,
} from "./../orders/index";
import { Warehouse } from "../warehouses/index";
import { Tag } from "../tags/index";

interface PackageItem {
  sales_order_item_id: number;
  item_id: number;
  name: string;
  sku: string;
  price: number;
  qty_ordered: number;
  qty_packed: number;
  discount: number;
  discount_percent: number;
  tax: number;
  tax_percent: number;
  total: number;
  quantity_in_bundle: number;
  quantity_on_hand: number;
}

interface Package {
  id: number;
  sales_order_id: number;
  package_type_id: number;
  items: PackageItem[];
  package_qty: number;
  package_total: number;
}

interface ShipmentData {
  supplier_name: string;
}

interface SupplierDetail {
  id: number;
  first_name: string;
  email: string;
  cc_email: string[];
  addresses: Address[];
  contact_number: string;
}

interface OrderShipment {
  id: number;
  created: string;
  modified: string;
  shipping_store_id: number;
  sales_order_id: number;
  shipping_qty: number;
  shipment_data: ShipmentData;
  shipping_total: number;
  shipping_date: string;
  shipping_method: string;
  shipping_address: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_country_code: string;
  shipping_zipcode: string;
  shipment_status: string;
  channel_order_number: string;
  shipping_name: string;
  shipment_inc_id: number;
  is_void: boolean;
  package: Package;
  label_print_count: number;
  slip_print_count: number;
  supplier_id: number;
  supplier_detail: SupplierDetail;
}

interface ListOrderItem {
  id: number;
  name: string;
  item_id: number;
  sku: string;
  quantity_ordered: number;
  quantity_shipped: number;
  quantity_cancelled: number;
  quantity_packed: number;
  item_price: number;
  row_total: number;
  discount_percent: number;
  discount_value: number;
  weight: number;
}

interface OrderPrintStatus {
  invoicePrinted: boolean;
  orderPrinted: boolean;
}

interface OrderTemplate {
  invoice: number;
}

interface SalesPersonUserDetails {
  backorder: boolean;
  id: number | null;
  auto_invoice: boolean;
  date_format: string;
  tax_type: string;
  tax_calculation: string;
  company_name: string;
  logo: string;
  country_name: string;
  contact_no: string;
  website_url: string | null;
  address1: string;
  address2: string | null;
  city: string;
  zipcode: string;
  state: string;
  vat_tin: string | null;
  currency_id: number;
}

interface OrderSalesPerson {
  id: number;
  name: string;
  username: string;
  timezone: string;
  user_details: SalesPersonUserDetails;
  reply_to: string;
}
interface ResourceLink {
  href: string;
  templated?: boolean;
}

interface OrderResources {
  self: ResourceLink;
  action_require: ResourceLink;
  order_sales_summary: ResourceLink;
}

export interface Shipment {
  warehouse: Warehouse | null;
  remark: string;
  prime: boolean;
  id: number;
  channel_order_id: string;
  contact_id: number;
  is_back_order: boolean;
  shipping_service: string | null;
  shipping_carrier: string | null;
  display_number: string;
  invoice_created: boolean;
  currency: string;
  payment_method: string | null;
  order_status: string;
  payment_status: string;
  billing_name: string;
  shipping_name: string;
  channel_order_number: string | null;
  reference_number: string | null;
  channel_id: number;
  store_id: number;
  store_name: string;
  channel_icon: string;
  channel_name: string;
  total: number;
  prefix: string;
  suffix: string;
  comment_count: number;
  is_any_unread: boolean;
  is_action_required: boolean | null;
  partially_cancel: boolean;
  action_required: boolean;
  warehouse_id: number;
  fulfillment_status: string | null;
  custom_fields: CustomField;
  preset_id: number | null;
  templates: OrderTemplate;
  print_status: OrderPrintStatus | null;
  purchase_order_links: string[] | null;
  sub_users: [];
  tags: Tag[];
  unread_comment_count: number;
  custom_pricing_tier_id: number | null;
  list_order_items: ListOrderItem[];
  order_items: OrderItem[];
  order_extra_items: OrderExtraItem[];
  shipment: OrderShipment[];
  shipping_address: Address;
  billing_address: Address;
  sales_person: OrderSalesPerson;
  base_currency_rate: number;
  tax_type: string;
  tax_calculation: string;
  valid_shipping_address: boolean | null;
  address_verification: boolean;
  shipping_address_type: string | null;
  split_order: boolean;
  mcf_status: string | null;
  discount_code: string | null;
  export_type: string;
  sync_created: string;
  hold_date: string | null;
  sync_modified: string;
  created_date: string;
  modified_date: string;
  delivery_date: string | null;
  resource_info: OrderResources;
  external_billing_bill_id: boolean;
  next_page: unknown | null;
  shipping_due_date: string | null;
}
