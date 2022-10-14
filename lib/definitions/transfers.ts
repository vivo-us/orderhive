import Joi from "joi";
import { AddCustomFieldSchema, CustomField } from "./orders";

interface TransferStockItem {
  product_id: number;
  product_name: string;
  category: unknown | null;
  condition: unknown | null;
  case_quantity: unknown | null;
  prep_pref: unknown | null;
  label_cost: unknown | null;
  currency_unit: unknown | null;
  prep_cost: unknown | null;
  product_sku: string;
  transfer_qty: number;
  item_note: unknown | null;
  item_price: number;
  total: number;
  received_qty: number;
  shipped_from: TransferShippedFrom[] | unknown[];
  received_at: TransferShippedFrom[] | unknown[];
  prep_details: unknown[];
  broken_or_missing_qty: number;
  custom_fields: CustomField[];
}

export interface Transfer {
  extBillId: unknown | null;
  intransferQtyUpdated: unknown | null;
  id: string;
  user_id: number;
  source_warehouse: { warehouse_id: number; store_id: unknown | null };
  destination_warehouse: { warehouse_id: number; store_id: unknown | null };
  transfer_date: number;
  transfer_description: string;
  inbound_shipment_details: unknown | null;
  break_bundle_into_components: boolean;
  is_fba: boolean;
  transfer_qty: number;
  transfer_file: unknown | null;
  transfer_number: string;
  status: string;
  stock_transfer_items: TransferStockItem[];
  stock_transfer_attachments: unknown[];
  custom_fields: CustomField[];
  total: number;
  folder_detail: FolderDetails;
}

interface FolderDetails {
  folder_id: string;
  folder_name: string;
}

interface TransferWarehouse {
  warehouse_id: number;
}

interface TransferStockItems {
  item_price: number;
  product_id: number;
  transfer_qty: number;
  custom_fields?: CustomField[];
  item_note?: string;
}

export interface CreateTransferData {
  orderId: string;
  break_bundle_into_components: boolean;
  destination_warehouse: TransferWarehouse;
  source_warehouse: TransferWarehouse;
  stock_transfer_items: TransferStockItems[];
  transfer_date: Date;
  readyForShipment: boolean;
  folder_detail?: FolderDetails;
  custom_fields?: Array<CustomField>;
  pickupDate?: Date;
  eta?: Date;
  transfer_description?: string;
}

interface CreateTransferStockItemResponse {
  product_id: number;
  product_name: string;
  category: unknown | null;
  condition: unknown | null;
  case_quantity: unknown | null;
  prep_pref: unknown | null;
  label_cost: unknown | null;
  currency_unit: unknown | null;
  prep_cost: unknown | null;
  product_sku: string;
  transfer_qty: number;
  item_note: unknown | null;
  item_price: number;
  total: number;
  received_qty: number;
  shipped_from: unknown[];
  received_at: unknown[];
  prep_details: unknown[];
  broken_or_missing_qty: number;
  custom_fields: CustomField[];
}

export interface CreateTransferResponse {
  extBillId: unknown | null;
  intransferQtyUpdated: unknown | null;
  id: string;
  user_id: number;
  source_warehouse: { warehouse_id: number; store_id: unknown | null };
  destination_warehouse: { warehouse_id: number; store_id: unknown | null };
  transfer_date: number;
  transfer_description: string;
  inbound_shipment_details: unknown | null;
  break_bundle_into_components: boolean;
  is_fba: boolean;
  transfer_qty: number;
  transfer_file: unknown | null;
  transfer_number: string;
  status: string;
  stock_transfer_items: CreateTransferStockItemResponse[];
  stock_transfer_attachments: unknown[];
  custom_fields: CustomField[];
  total: number;
  folder_detail: FolderDetails;
}

const TransferWarehouseSchema = Joi.object({
  warehouse_id: Joi.number().required(),
});

const TransferStockItemsSchema = Joi.object({
  custom_fields: Joi.array().items(AddCustomFieldSchema),
  item_price: Joi.number().required(),
  product_id: Joi.number().required(),
  transfer_qty: Joi.number().required(),
  item_note: Joi.string(),

});

export const CreateTransferDataSchema = Joi.object({
  orderId: Joi.string().required(),
  break_bundle_into_components: Joi.boolean().required(),
  destination_warehouse: TransferWarehouseSchema.required(),
  source_warehouse: TransferWarehouseSchema.required(),
  stock_transfer_items: Joi.array().items(TransferStockItemsSchema).required(),
  transfer_date: Joi.date().required(),
  readyForShipment: Joi.boolean().required(),
  folder_detail: Joi.object({
    folder_id: Joi.string().required(),
    folder_name: Joi.string().required(),
  }),
  custom_fields: Joi.array().items(AddCustomFieldSchema),
  pickupDate: Joi.date(),
  eta: Joi.date(),
  transfer_description: Joi.string().allow(""),
});

interface TransferLbcdetail {
  id: string;
  location?: string;
  quantity: number;
  batch?: string;
  cost?: number;
}

export interface ShipTransferData {
  id: number;
  lbcdetails: TransferLbcdetail[];
  product_details?: unknown[];
}

export const ShipTransferDataSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().required(),
    lbcdetails: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          location: Joi.string().allow(null),//.required(),
          quantity: Joi.number().required(),
          batch: Joi.string(),
          cost: Joi.number(),
        })
      )
      .required(),
    product_details: Joi.array().items(Joi.object()),
  }).required()
);

interface TransferShippedFrom {
  id: string;
  location: string;
  batch: string | null;
  cost: number | null;
  quantity: number;
}

interface ShipTransferStockItemResponse {
  product_id: number;
  product_name: string;
  category: unknown | null;
  condition: unknown | null;
  case_quantity: unknown | null;
  prep_pref: unknown | null;
  label_cost: unknown | null;
  currency_unit: unknown | null;
  prep_cost: unknown | null;
  product_sku: string;
  transfer_qty: number;
  item_note: unknown | null;
  item_price: number;
  total: number;
  received_qty: number;
  shipped_from: TransferShippedFrom[];
  received_at: unknown[];
  prep_details: unknown[];
  broken_or_missing_qty: number;
  custom_fields: CustomField[];
}

export interface ShipTransferResponse {
  extBillId: unknown | null;
  intransferQtyUpdated: unknown | null;
  id: string;
  user_id: number;
  source_warehouse: { warehouse_id: number; store_id: unknown | null };
  destination_warehouse: { warehouse_id: number; store_id: unknown | null };
  transfer_date: number;
  transfer_description: string;
  inbound_shipment_details: unknown | null;
  break_bundle_into_components: boolean;
  is_fba: boolean;
  transfer_qty: number;
  transfer_file: unknown | null;
  transfer_number: string;
  status: string;
  stock_transfer_items: ShipTransferStockItemResponse[];
  stock_transfer_attachments: unknown[];
  custom_fields: CustomField[];
  total: number;
  folder_detail: FolderDetails;
}

export interface ReceiveTransferData {
  id: number;
  broken_or_missing_qty: number;
  custom_fields?: CustomField[];
  received_qty: number;
}

export const ReceiveTransferDataSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().required(),
    broken_or_missing_qty: Joi.number().required(),
    custom_fields: Joi.array().items(AddCustomFieldSchema),
    received_qty: Joi.number().required(),
  }).required()
);

export const TransferStatusOptionsSchema = Joi.string().valid(
  "RAISED",
  "SHIPPED",
  "PARTIALLY_RECEIVED",
  "RECEIVED",
  "CANCELLED",
  "COMPLETED"
);

export const ListTransfersOptionsSchema = Joi.object({
  page: Joi.number().positive().default(1),
  folder_ids: Joi.array().items(Joi.string()),
});

export type TransferStatusOptions =
  | "RAISED"
  | "SHIPPED"
  | "PARTIALLY_RECEIVED"
  | "RECEIVED"
  | "CANCELLED"
  | "COMPLETED";

export interface ListTransfersOptions {
  page?: number;
  folder_ids?: string[];
}

export interface ListTransfersPayload {
  folder_ids?: string[];
  status: TransferStatusOptions;
}

interface ListTransfersMeta {
  current_page: number;
  size: number;
  records: number;
}

export interface ListTransfersResponse {
  count: number | null;
  stock_transfer: Transfer[];
  meta: ListTransfersMeta;
}
