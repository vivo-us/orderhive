import joi from "joi";
import {
  Address,
  IdSchema,
  Timestamps,
  Weight,
  CreateAddressSchema,
  CreateAddress,
  WeightUnitSchema,
} from "./global";

const AddCustomFieldSchema = joi.object().keys({
  name: joi.string().required(),
  value: joi
    .alternatives(joi.string(), joi.object(), joi.array().items(joi.string()))
    .required(),
  ype: joi
    .string()
    .valid("DROP_DOWN", "TEXT", "DATE", "CHECKBOX", "NUMBER")
    .required(),
});
export interface CustomField {
  id?: number;
  name: string;
  value: string | object | Array<string>;
  type: "DROP_DOWN" | "TEXT" | "DATE" | "CHECKBOX" | "NUMBER";
}

const GroupSchema = joi.object().keys({
  id: IdSchema.required(),
  name: joi.string().required(),
  tax_value: joi.number().positive().required(),
  total_tax_value: joi.number().positive().required(),
});
export interface Group {
  id: number;
  name: string;
  tax_rate: number;
  total_tax_value: number;
}

const TaxInfoSchema = joi.object().keys({
  id: IdSchema.required(),
  tax_rate: joi.number().positive().required(),
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

export interface ItemWarehouse {
  available_qty: number;
  incoming_qty: number;
  outgoing_qty: number;
  warehouse_qty: number;
  warehouse_id: number;
  name: string;
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
  price: joi.number().positive().required(),
  quantity_ordered: joi.number().positive().integer().required(),
  row_total: joi.number().positive(),
  tax_info: TaxInfoSchema,
  tax_percent: joi.number().positive(),
  tax_value: joi.number().positive(),
});
export interface AddOrderExtraItem extends Weight {
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

const AddOrderItemSchema = joi.object().keys({
  asin_number: joi.string(),
  barcode: joi.string(),
  channel_primary_id: joi.string(),
  channel_secondary_id: joi.string(),
  discount_percent: joi.when("discount_type", {
    is: "PERCENT",
    then: joi.number().positive().required(),
    otherwise: joi.forbidden(),
  }),
  discount_type: joi.string().valid("PERCENT", "VALUE").required(),
  discount_value: joi.when("discount_type", {
    is: "VALUE",
    then: joi.number().positive().required(),
    otherwise: joi.forbidden(),
  }),
  item_id: IdSchema.required(),
  meta_data: joi.array().items(MetaDataSchema),
  name: joi.string(),
  note: joi.string(),
  price: joi.number().positive(),
  quantity_ordered: joi.number().positive().integer().min(1).required(),
  quantity_invoiced: joi.number().positive().integer(),
  row_total: joi.number().positive(),
  sku: joi.string(),
  tax_info: TaxInfoSchema,
  tax_percent: joi.number().positive().required(),
  tax_value: joi.number().positive(),
  type: joi.string(),
  weight: joi.number().positive().required(),
  weight_unit: WeightUnitSchema.required(),
});
export interface AddOrderItem extends Weight {
  asin_number?: string | null;
  barcode?: string | null;
  channel_primary_id?: string | null;
  channel_secondary_id?: string | null;
  discount_percent?: number;
  discount_type: "PERCENT" | "VALUE";
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
  base_currency_rate: joi.number().positive(),
  billing_address: CreateAddressSchema.required(),
  channel_order_id: joi.string(),
  channel_order_number: joi.string(),
  contact_id: IdSchema,
  currency: joi.string(),
  custom_fields: joi.array().items(AddCustomFieldSchema),
  custom_pricing_tier_id: IdSchema,
  delivery_date: joi.string(),
  grand_total: joi.number().positive().required(),
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

export interface Order {
  base_currency?: string | null;
  base_currency_rate?: number;
  billing_address: CreateAddress;
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
  shipping_address: CreateAddress;
  shipping_carrier?: string | null;
  shipping_due_date?: string | null;
  shipping_service?: string | null;
  store_id: number;
  sync_created?: string;
  tax_type: "INCLUSIVE" | "EXCLUSIVE";
  warehouse_id: number;
}

const SplitItemSchema = joi.object().keys({
  id: IdSchema.required(),
  qty_split: joi.number().positive().integer().required(),
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
  nextToken: joi.string(),
});

export interface ListOrdersOptions {
  filters?: Filter;
  sortBy?: Sort;
  query?: string;
  nextToken?: string;
}

export const EditOrderSchema = joi.object().keys({
  contact_id: IdSchema,
  channel_order_number: joi.string(),
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
    AddOrderItemSchema.append({
      update_type: joi.string().valid("ADD", "EDIT", "REMOVE").required(),
    })
  ),
});
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
  order_extra_items?: Array<OrderExtraItem>;
  order_items?: Array<OrderItem>;
}
