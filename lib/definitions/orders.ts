import joi from "joi";
import {
  Address,
  IdSchema,
  Timestamps,
  Weight,
  CreateAddressSchema,
  CreateAddress,
  WeightUnitSchema,
  WeightUnit,
} from "./global";
import { InventoryWarehouse } from "./inventory";

export const AddCustomFieldSchema = joi.object().keys({
  id: IdSchema.optional(),
  name: joi.string().required(),
  value: joi
    .alternatives(
      joi.boolean(),
      joi.string(),
      joi.object(),
      joi.array().items(joi.string())
    )
    .required(),
  type: joi
    .string()
    .valid("DROP_DOWN", "TEXT", "DATE", "CHECKBOX", "NUMBER", "LINK")
    .required(),
});

const EditCustomFieldSchema = joi.object().keys({
  name: joi.string().required(),
  value: joi
    .alternatives(
      joi.boolean(),
      joi.string(),
      joi.object(),
      joi.array().items(joi.string())
    )
    .required(),
  type: joi
    .string()
    .valid("DROP_DOWN", "TEXT", "DATE", "CHECKBOX", "NUMBER", "LINK")
    .required(),
});

export interface OrderTag {
  id: number;
  tag_id: number;
  linked_id: number;
  tag_name: string;
  tag_color: string;
}
export interface CustomField {
  id?: string;
  name: string;
  value: Boolean | string | object | Array<string>;
  type: "DROP_DOWN" | "TEXT" | "DATE" | "CHECKBOX" | "NUMBER" | "LINK";
}
interface EditCustomField {
  name: string;
  value: Boolean | string | object | Array<string>;
  type: "DROP_DOWN" | "TEXT" | "DATE" | "CHECKBOX" | "NUMBER" | "LINK";
}

const GroupSchema = joi.object().keys({
  id: IdSchema.required(),
  name: joi.string().required(),
  tax_value: joi.number().positive().allow(0).required(),
  total_tax_value: joi.number().positive().allow(0).required(),
});
export interface Group {
  id: number;
  name: string;
  tax_rate: number;
  total_tax_value: number;
}

const TaxInfoSchema = joi.object().keys({
  id: IdSchema.required(),
  tax_rate: joi.number().positive().allow(0).required(),
  groups: joi.array().items(GroupSchema).required(),
});
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

export interface InventoryLevel {
  default: boolean;
  cost: number;
  batch: string | null;
  location: string | null;
  product_id: number;
  warehouse_id: number;
  adjust_quantity: any | null;
  is_default: boolean;
}
export interface ItemWarehouse {
  warehouse_id: number;
  available_qty: number;
  incoming_qty: number;
  outgoing_qty: number;
  inventory_levels?: InventoryLevel[];
}

const MetaDataSchema = joi.object().keys({
  key: joi.string().required(),
  label: joi.string().required(),
  name: joi.string().required(),
  type: joi.string().required(),
  value: joi.string().required(),
  valuesArray: joi.array().items(joi.string()).required(),
});
export interface MetaData {
  key: string;
  label: string;
  name: string;
  type: string;
  value: string;
  valuesArray: Array<string>;
}

const AddOrderExtraItemSchema = joi.object().keys({
  display_type: joi.string(),
  name: joi.string().required(),
  price: joi.number().positive().allow(0).required(),
  quantity_ordered: joi.number().positive().allow(0).integer().required(),
  row_total: joi.number().positive().allow(0),
  tax_info: TaxInfoSchema,
  tax_percent: joi.number().positive().allow(0),
  tax_value: joi.number().positive().allow(0),
});
export interface AddOrderExtraItem {
  id: number;
  channel_description?: string;
  quantity_available?: number;
  quantity_cancelled?: number;
  quantity_dropship?: number;
  quantity_invoiced?: number;
  quantity_packed?: number;
  quantity_shipped?: number;
  update_type?: "ADD" | "EDIT" | "REMOVE";
  display_type?: string;
  name: string;
  price: number;
  quantity_ordered: number;
  row_total?: number;
  tax_info?: TaxInfo;
  tax_percent: number;
  tax_value?: number;
}
export interface OrderExtraItem extends Weight {
  id: number;
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
  row_total: number;
  tax_info?: TaxInfo;
  tax_percent: number;
  tax_value: number;
  type: string | null;
}

export const UpdateOrderItemSchema = joi.object().keys({
  id: IdSchema,
  item_id: IdSchema,
  asin_number: joi.string(),
  barcode: joi.string(),
  channel_primary_id: joi.string(),
  channel_secondary_id: joi.string(),
  discount_percent: joi.when("discount_type", {
    is: "percent",
    then: joi.number().positive().allow(0).required(),
    otherwise: joi.number().positive().allow(0),
  }),
  discount_type: joi.string().valid("percent", "value").required(),
  discount_value: joi.when("discount_type", {
    is: "value",
    then: joi.number().positive().allow(0).required(),
    otherwise: joi.number().positive().allow(0),
  }),
  meta_data: joi.array().items(MetaDataSchema),
  name: joi.string(),
  note: joi.string().allow(""),
  price: joi.number().positive().allow(0),
  quantity_ordered: joi
    .number()
    .positive()
    .allow(0)
    .integer()
    .min(1)
    .required(),
  quantity_invoiced: joi.number().positive().allow(0).integer(),
  row_total: joi.number().positive().allow(0),
  sku: joi.string(),
  tax_info: TaxInfoSchema,
  tax_percent: joi.number().positive().allow(0),
  tax_value: joi.number().positive().allow(0),
  type: joi.string(),
  weight: joi.number().positive().allow(0),
  weight_unit: WeightUnitSchema,
  update_type: joi.string().valid("ADD", "EDIT", "REMOVE").required(),
});

export interface UpdateOrderItem {
  id: number;
  item_id: number;
  asin_number?: string | null;
  barcode?: string | null;
  channel_primary_id?: string | null;
  channel_secondary_id?: string | null;
  discount_percent?: number;
  discount_type: "percent" | "value";
  discount_value?: number;
  meta_data?: Array<MetaData> | null;
  name?: string | null;
  note?: string | null;
  price?: number;
  quantity_ordered: number;
  quantity_invoiced?: number;
  row_total?: number;
  sku?: string | null;
  tax_info?: TaxInfo | null;
  tax_percent?: number;
  tax_value?: number;
  type?: string | null;
  weight?: number;
  weight_unit?: WeightUnit;
  update_type: "ADD" | "EDIT" | "REMOVE";
}

const AddOrderItemSchema = joi.object().keys({
  asin_number: joi.string(),
  barcode: joi.string(),
  channel_primary_id: joi.string(),
  channel_secondary_id: joi.string(),
  discount_percent: joi.when("discount_type", {
    is: "percent",
    then: joi.number().positive().allow(0).required(),
    otherwise: joi.number().positive().allow(0),
  }),
  discount_type: joi.string().valid("percent", "value").allow(null),
  discount_value: joi.when("discount_type", {
    is: "value",
    then: joi.number().positive().allow(0).required(),
    otherwise: joi.number().positive().allow(0),
  }),
  item_id: IdSchema.required(),
  meta_data: joi.array().items(MetaDataSchema),
  name: joi.string(),
  note: joi.string().allow(""),
  price: joi.number().positive().allow(0),
  quantity_ordered: joi
    .number()
    .positive()
    .allow(0)
    .integer()
    .min(1)
    .required(),
  quantity_invoiced: joi.number().positive().allow(0).integer(),
  row_total: joi.number().positive().allow(0),
  sku: joi.string(),
  tax_info: TaxInfoSchema,
  tax_percent: joi.number().positive().allow(0).required(),
  tax_value: joi.number().positive().allow(0),
  type: joi.string(),
  weight: joi.number().positive().allow(0).allow(null),
  weight_unit: WeightUnitSchema.allow(null),
});
export interface AddOrderItem extends Weight {
  asin_number?: string | null;
  barcode?: string | null;
  channel_primary_id?: string | null;
  channel_secondary_id?: string | null;
  discount_percent?: number;
  discount_type: "percent" | "value";
  discount_value?: number;
  item_id: number;
  meta_data?: Array<MetaData> | null;
  name?: string | null;
  note?: string | null;
  price?: number;
  quantity_ordered: number;
  quantity_invoiced?: number;
  row_total?: number;
  sku?: string | null;
  tax_info?: TaxInfo | null;
  tax_percent: number;
  tax_value?: number;
  type?: string | null;
}

export interface OrderItemMetaData {
  name: string;
  value: string | number;
}

export interface OrderItemComponent {
  sku: string;
  name: string | null;
  barcode: string | null;
  asin: string | null;
  item_id: number;
  available_qty: number;
  incoming_qty: number;
  outgoing_qty: number;
  image: ProductImage;
  quantity_in_bundle: number;
  locations: any[] | null;
  product_warehouses: InventoryWarehouse[];
  qty_picked: number | null;
}

export interface OrderItem {
  asin_number: string | null;
  barcode: string | null;
  brand: string | null;
  category: string | null;
  channel_primary_id: string | null;
  channel_secondary_id: string | null;
  components: OrderItemComponent[] | null;
  default_supplier_id: number | null;
  discount_percent: number;
  discount_type: "percent" | "value";
  discount_value: number;
  id: number;
  item_id: number;
  item_warehouse: Array<ItemWarehouse> | null;
  last_purchase_price: number | null;
  meta_data: Array<OrderItemMetaData> | null;
  name: string | null;
  note: string | null;
  price: number;
  product_image: ProductImage | null;
  properties: Array<any> | null;
  quantity_ordered: number;
  quantity_cancelled: number;
  quantity_shipped: number;
  quantity_available: number;
  quantity_on_hand: number | null;
  quantity_returned: number;
  quantity_delivered: number;
  quantity_packed: number;
  quantity_dropshipped: number;
  quantity_invoiced: number;
  row_total: number;
  serial_numbers: Array<string> | null;
  sku: string;
  suppliers: object;
  tax_info: TaxInfo | null;
  tax_percent: number;
  tax_value: number;
  type: string | null;
  update_type?: "ADD" | "EDIT" | "REMOVE";
  weight: number;
  weight_unit: WeightUnit;
}

export const OrderStatusSchema = joi
  .string()
  .valid("CONFIRM", "NOT_CONFIRM", "SHIP", "DELIVER", "CANCEL");
export type OrderStatus =
  | "CONFIRM"
  | "NOT_CONFIRM"
  | "SHIP"
  | "DELIVER"
  | "CANCEL";

const PaymentStatusSchema = joi
  .string()
  .valid("PAID", "NOT_PAID", "PARTIAL_PAID");
export type PaymentStatus = "PAID" | "NOT_PAID" | "PARTIAL_PAID";

export const CreateOrderSchema = joi.object().keys({
  base_currency: joi.string(),
  base_currency_rate: joi.number().positive().allow(0),
  billing_address: CreateAddressSchema.required(),
  channel_order_id: joi.string(),
  channel_order_number: joi.string(),
  contact_id: IdSchema,
  currency: joi.string(),
  custom_fields: joi.array().items(AddCustomFieldSchema),
  custom_pricing_tier_id: IdSchema,
  delivery_date: joi.string(),
  grand_total: joi.number().positive().allow(0).required(),
  order_extra_items: joi.array().items(AddOrderExtraItemSchema),
  order_items: joi.array().items(AddOrderItemSchema).required(),
  order_status: OrderStatusSchema.required(),
  payment_method: joi.string(),
  payment_status: PaymentStatusSchema.required(),
  reference_number: joi.string(),
  remark: joi.string(),
  sales_person_id: IdSchema,
  shipping_address: CreateAddressSchema.required(),
  shipping_carrier: joi.string(),
  shipping_service: joi.string(),
  store_id: IdSchema.required(),
  tax_type: joi.string().valid("INCLUSIVE", "EXCLUSIVE").required(),
  warehouse_id: IdSchema.required(),
});

export interface CreateOrder {
  base_currency?: string | null;
  base_currency_rate?: number;
  billing_address: CreateAddress;
  channel_order_id?: string;
  channel_order_number?: string | null;
  contact_id?: number | null;
  currency?: string;
  custom_fields?: Array<CustomField>;
  custom_pricing_tier_id?: number;
  custom_status?: number;
  delivery_date?: string | null;
  grand_total: number;
  order_extra_items?: Array<AddOrderExtraItem>;
  order_items: Array<AddOrderItem>;
  order_status: OrderStatus;
  payment_method?: string | null;
  payment_status: PaymentStatus;
  reference_number?: string | null;
  remark?: string | null;
  sales_person_id?: number | null;
  shipping_address: CreateAddress;
  shipping_carrier?: string | null;
  shipping_due_date?: string | null;
  shipping_service?: string | null;
  store_id: number;
  tax_type: "INCLUSIVE" | "EXCLUSIVE";
  warehouse_id: number;
}

export interface Link {
  href: string;
}
export interface ResourceInfo {
  self: Link;
  action_require: Link;
  order_sales_summary: Link;
}
export interface ListOrderItem {
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
  weight: number | null;
}

export interface Order {
  address_verification: any | null;
  base_currency: string | null;
  base_currency_rate: number | null;
  billing_address: CreateAddress;
  billing_name: string | null;
  channel_id: number;
  channel_order_id: string;
  channel_order_number: string | null;
  channel_icon: string | null;
  channel_name: string;
  config: any | null;
  contact_id: number | null;
  comment_count: number;
  created_date: string;
  currency: string;
  custom_fields: CustomField[] | null;
  custom_pricing_tier_id: number | null;
  custom_status: number | null;
  delivery_date: string | null;
  discount_code: string | null;
  display_number: string;
  external_billing_bill_id: number | null;
  export_type: string | null;
  fulfillment_status: string | null;
  grand_total: number;
  hold_date: string | null;
  id: number;
  is_action_required: boolean;
  is_any_unread: boolean;
  is_back_order: boolean;
  is_prime: boolean;
  invoice_created: boolean;
  list_order_items: ListOrderItem[];
  mcf_status: string | null;
  next_page: any | null;
  order_extra_items: OrderExtraItem[];
  order_items: OrderItem[];
  order_items_size: number;
  order_status: OrderStatus;
  parent_id: number | null;
  partially_cancel: boolean;
  payment_method: string | null;
  payment_status: PaymentStatus;
  preset_id: number | null;
  prefix: string | null;
  prime: boolean;
  print_status: string | null;
  purchase_order_links: any[] | null;
  reference_number: string | null;
  remark: string | null;
  resource_info: ResourceInfo;
  sales_person: any | null;
  sales_person_id: number | null;
  shipping_address: CreateAddress;
  shipping_address_type: string | null;
  shipping_carrier: string | null;
  shipping_due_date: string | null;
  shipping_service: string | null;
  shipping_name: string | null;
  shipment: any | null;
  split_order: boolean;
  store_id: number;
  store_name: string;
  sub_users: any[];
  suffix: string | null;
  sync_created: string;
  sync_modified: string | null;
  tax_calculation: string;
  tax_type: "inclusive" | "exclusive";
  tags: OrderTag[] | null;
  templates: Object;
  total: number;
  total_quantity_ordered: number;
  unread_comment_count: number;
  valid_shipping_address: boolean;
  warehouse_id: number;
}

const SplitItemSchema = joi.object().keys({
  id: IdSchema.required(),
  qty_split: joi.number().positive().allow(0).integer().required(),
});
interface SplitItem {
  id: number;
  qty_split: number;
}

export const SplitOrderDataSchema = joi.object().keys({
  split_items: joi.array().items(SplitItemSchema).required(),
  channel_order_number: joi.string(),
});
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

const FilterSchema = joi
  .object()
  .keys({
    order_status: joi.array().items(OrderStatusSchema),
    custom_status: joi.array().items(IdSchema),
    storesByIds: joi.array().items(IdSchema),
    tagsByNames: joi.array().items(joi.string()),
    shipping_country: joi.array().items(joi.string()),
    payment_status: joi.array().items(PaymentStatusSchema),
    from_date: joi.date(),
    to_date: joi.date(),
    warehousesByIds: joi.array().items(IdSchema),
    shipping_service: joi.array().items(joi.string()),
    shipping_carrier: joi.array().items(joi.string()),
    pending_invoice: joi.boolean(),
    invoice_printed: joi.boolean(),
    from_due_date: joi.date(),
    to_due_date: joi.date(),
  })
  .and("from_date", "to_date")
  .and("from_due_date", "to_due_date");
interface Filter {
  order_status?: OrderStatus[];
  custom_status?: number[];
  storesByIds?: number[];
  tagsByNames?: string[];
  shipping_country?: string[];
  payment_status?: PaymentStatus[];
  from_date?: string;
  to_date?: string;
  warehousesByIds?: number[];
  shipping_service?: string[];
  shipping_carrier?: string[];
  pending_invoice?: boolean;
  invoice_printed?: boolean;
  from_due_date?: string;
  to_due_date?: string;
}

const SortSchema = joi.object().keys({
  property: joi.string().required(),
  direction: joi.string().valid("ASC", "DESC").required(),
});
interface Sort {
  property: string;
  direction: "ASC" | "DESC";
}

export const ListOrderSchema = joi.object().keys({
  filters: FilterSchema,
  sortBy: SortSchema,
  query: joi.string(),
  next_token: joi.string(),
});

export interface ListOrdersOptions {
  filters?: Filter;
  sortBy?: Sort;
  query?: string;
  next_token?: string;
}

export const EditOrderSchema = joi.object().keys({
  contact_id: IdSchema,
  channel_order_number: joi.string(),
  custom_fields: joi.array().items(EditCustomFieldSchema),
  payment_method: joi.string(),
  reference_number: joi.string(),
  sales_person_id: IdSchema,
  remark: joi.string(),
  delivery_date: joi.string(),
  shipping_carrier: joi.string(),
  shipping_service: joi.string(),
  shipping_address: CreateAddressSchema,
  billing_address: CreateAddressSchema,
  order_extra_items: joi.array().items(
    AddOrderExtraItemSchema.append({
      update_type: joi.string().valid("ADD", "EDIT", "REMOVE").required(),
    })
  ),
  order_items: joi.array().items(
    UpdateOrderItemSchema.append({
      update_type: joi.string().valid("ADD", "EDIT", "REMOVE").required(),
    })
  ),
  warehouse_id: IdSchema,
});
export interface EditOrderOptions {
  billing_address?: Address;
  channel_order_number?: string;
  contact_id?: number;
  custom_fields?: EditCustomField[];
  delivery_date?: string;
  payment_method?: string;
  reference_number?: string;
  remark?: string;
  sales_person_id?: number;
  shipping_address?: Address;
  shipping_carrier?: string;
  shipping_service?: string;
  order_extra_items?: Array<AddOrderExtraItem>;
  order_items?: Array<UpdateOrderItem>;
  warehouse_id?: number;
}

export interface ListOrdersResponse {
  data: Order[];
  next_token?: string;
}
