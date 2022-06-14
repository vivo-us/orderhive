import { CustomField, OrderExtraItem, OrderItem } from "./orders";
import { Warehouse } from "./warehouses";
import { Tag } from "./tags";
import { WeightUnit, DimensionUnit, Address, Timestamps } from "./global";

export interface ShippingStore extends Timestamps {
  id: number;
  channel_id: number;
  channel_name: string;
  key1: string;
  key2?: string;
  active: boolean;
  shipment_count?: number;
  store_config?: object;
}

export interface ShippingMethod extends Timestamps {
  id: number;
  name: string;
  title: string;
}

export interface ShippingPackageType extends Timestamps {
  id: number;
  name: string;
  length: number;
  width: number;
  height: number;
  unit: DimensionUnit;
}

export interface LabelSettings extends Timestamps {
  id: number;
  format: string;
  custom_message_1: string;
  custom_message_2: string;
  custom_message_3: string;
}

interface PredefinedValues extends Timestamps {
  id: number;
  description: string;
  value: number;
  weight: number;
  weight_unit: WeightUnit;
  origin_country: string;
  hsn_code: string;
}

export interface CustomsSettings extends Timestamps {
  id: number;
  content_type: string;
  name: string;
  content_description?: string;
  non_delivery_option: string;
  customs_declaration: string;
  signer: string;
  eel_pfc: string;
  pre_defined_values?: PredefinedValues;
  pre_defined_item_id?: number;
}

interface CreateShipmentItem {
  item_id: number;
  quantity_to_ship: number;
  sales_order_item_id: number;
  sku?: string;
  price?: number;
}

interface ParentChildShipment {
  package_weight?: number;
  package_weight_unit?: WeightUnit;
  length?: number;
  width?: number;
  height?: number;
  dimension_unit?: DimensionUnit;
  label_url?: string;
  package_options: "Pre-defined" | "Custom";
  predefined_package?: string;
  tracking_number?: string;
}

export interface CreateMultipieceShipmentOptions {
  parent_shipment: ParentChildShipment;
  child_shipments: ParentChildShipment[];
  rate_value?: number;
  order_rate_value?: number;
  order_currency: string;
  shipping_method: string;
  courier_name: string;
  shipping_date: string;
  sales_order_id: number;
  warehouse_id: number;
  items: CreateShipmentItem[];
}

export interface CreateShipmentOptions {
  order_currency: string;
  shipping_method: string;
  courier_name: string;
  shipping_date: string;
  sales_order_id: number;
  warehouse_id: number;
  items: CreateShipmentItem[];
  tracking_number?: string;
  label_url?: string;
  package_weight?: number;
  package_weight_unit?: WeightUnit;
  length?: number;
  width?: number;
  height?: number;
  dimension_unit?: DimensionUnit;
  shipping_cost?: number;
}

export interface CreateShipmentResponse extends Timestamps {
  id: number;
  shipmentLocationValue: string;
  shipmentCount: number;
  partiallyFulfilled: boolean;
  autoMCF: boolean;
  validForPreviewFulfillment: boolean;
  shipping_store_id: number;
  sales_order_id: number;
  slip_print_count: number;
  label_print_count: number;
  add_task: boolean;
  add_labelslip: boolean;
  shipping_qty: number;
  shipping_total: number;
  shipping_date: string;
  shipping_method: string;
  courier_name: string;
  tracking_number?: string;
  tracking_id?: string;
  label_url?: string;
  shipping_address: string;
  shipping_address_2?: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_country_code: string;
  shipping_zipcode: string;
  shipment_status: string;
  channel_order_number: string;
  shipping_name: string;
  insurance_fee: number;
  is_send_component: boolean;
  is_picked_item_shipped: boolean;
  is_return: boolean;
  ftp_stores: [];
  tracking_source?: string;
  shipment_data?: ShipmentData;
  shipment_inc_id: number;
  warehouse: Warehouse;
  package: Package;
  warehouse_id: number;
  parent_id: number;
  export_type: number;
}
interface ShipmentExtraItem {
  label: string;
  price: number;
  total: number;
  tax: number;
  tax_percent: number;
  quantity_to_ship: number;
}
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
  quantity_in_bundle?: number;
  quantity_on_hand?: number;
}

export interface Package {
  id: number;
  sales_order_id: number;
  package_type_id: number;
  items: PackageItem[];
  extra_items: ShipmentExtraItem[];
  package_qty: number;
  package_total: number;
  package_inc_id?: number;
}

export interface ShipmentData {
  supplier_name?: string;
  rate?: string;
  rate_currency?: string;
}

interface SupplierDetail {
  id: number;
  first_name: string;
  email: string;
  cc_email: string[];
  addresses: Address[];
  contact_number: string;
}

interface OrderShipment extends Timestamps {
  id: number;
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
