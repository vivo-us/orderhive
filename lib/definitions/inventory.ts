import joi from "joi";
import { ProductImage } from "./products";
import { DimensionUnit, WeightUnit } from "./global";
import { ProductSupplier, ProductType } from "./products";

interface WarehouseInventoryLevel {
  location: string;
  product_id: number;
  tenant_id?: number;
  warehouse_id: number;
  is_default: boolean;
  quantity: number;
  version: number;
  cost?: string;
  batch?: string;
}

export interface InventoryWarehouse {
  status: number;
  id: number;
  warehouse_id: number;
  available_qty: number;
  on_hand_qty: number;
  outgoing_qty: number;
  incoming_qty: number;
  intransfer_qty: number;
  inventory_levels?: WarehouseInventoryLevel[];
}
export interface GetWarehouseInventoryOptions {
  page?: number;
  direction?: "-1" | "1";
  limit?: number;
}

export interface Inventory {
  _id: string;
  id: number;
  image?: ProductImage;
  origin_country?: string;
  archived: string;
  status: string;
  brand?: string;
  name: string;
  sku: string;
  lower_sku: string;
  parent_id?: number;
  type: string;
  barcode?: string;
  available_qty: number;
  incoming_qty: number;
  intransfer_qty: number;
  on_hand_qty: number;
  outgoing_qty: number;
  shortage_qty: number;
  warehouse_qty: number;
  backorder_qty: number;
  product_suppliers: ProductSupplier[];
  oh_price_1?: number;
  location: string;
  lbcquantity: number;
  warehouse_name: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  weight_unit: WeightUnit;
  measurement_unit: DimensionUnit;
  [key: string]: any;
  tenant_id: number;
  created: number;
  modified: number;
}

export interface ProductsInventory {
  id: number;
  archived: boolean;
  updated: boolean;
  type: ProductType;
  product_warehouses: InventoryWarehouse[];
}

export interface ProductInventory {
  _id: string;
  location: string;
  product_id: number;
  tenant_id: number;
  warehouse_id: number;
  is_default: boolean;
  quantity: number;
  version?: number;
  batch?: string;
  cost?: number;
}

export interface WarehouseInventoryReponse {
  count: number;
  reportData: Inventory[];
}

export const WarehouseInventorySchema = joi.object({
  page: joi.number().integer().positive().min(1),
  direction: joi.string().valid("-1", "1"),
  limit: joi.number().integer().positive().min(1),
});

const EditInventoryLevelSchema = joi
  .object({
    location: joi.string().allow(""),
    is_default: joi.boolean(),
    onhand_original: joi.number().integer(),
    quantity: joi.number().integer(),
    batch: joi.string(),
    cost: joi.number().positive().allow(0).cast("string"),
    reason: joi.string(),
    remove: joi.boolean(),
    new_quantity: joi.number().cast("string"),
    new_location: joi.boolean(),
    _id: joi.string().allow("").allow(null),
    //warehouse_id: joi.number()
  })
  .or("location", "batch", "cost")
  .with("new_location", ["new_quantity", "quantity", "onhand_original"])
  .with("new_quantity", ["quantity", "onhand_original"])
  .without("remove", [
    "new_location",
    "new_quantity",
    "onhand_original",
    "reason",
  ]);
export const EditInventorySchema = joi.object({
  warehouses: joi
    .array()
    .items(
      joi.object({
        warehouse_id: joi.number().integer().positive().required(),
        on_hand_quantity: joi.number().integer().positive().allow(0).required(),
        remark: joi.object({ source: joi.string() }),
        inventory_levels: joi.array().items(EditInventoryLevelSchema),
      })
    )
    .required(),
});

interface EditInventoryRemark {
  source: string;
}
interface EditInventoryLevel {
  location?: string;
  is_default?: boolean;
  onhand_original?: number;
  quantity?: number; //final quantity
  batch?: string;
  cost?: number;
  reason?: string;
  remove?: boolean;
  new_quantity?: number; //original on hand + added
  new_location?: boolean;
  warehouse_id?: number;
}
interface EditInventoryLevelWarehouse {
  warehouse_id: number;
  on_hand_quantity: number;
  inventory_levels?: EditInventoryLevel[];
  remark: EditInventoryRemark;
}
export interface EditInventory {
  warehouses: EditInventoryLevelWarehouse[];
}

interface EditInventoryReponseRemark {
  source: string;
  meta: Object;
}

interface EditInventoryReponseInventoryLevel {
  _id?: string;
  location: string;
  product_id: number;
  warehouse_id: number;
  is_default?: boolean;
  quantity?: number;
  version?: number;
  remove: boolean;
  updated: boolean;
}

interface EditInventoryReponseWarehouse {
  warehouse_id: number;
  add_quantity: number;
  on_hand_quantity: number;
  remark: EditInventoryReponseRemark;
  updated: boolean;
  inventory_levels: EditInventoryReponseInventoryLevel;
}
export interface EditInventoryResponse {
  warehouses: EditInventoryReponseWarehouse[];
  purchaseOrderRequest: boolean;
}

interface BatchData {
  batch_number: string;
  status: string;
}

export interface ListBatchResponse {
  BatchResponse: Object;
  created: string;
  modified: string;
  id: string;
  batch: string;
  data: BatchData;
}
