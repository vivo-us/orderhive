import { ProductImage } from "./products";
import { DimensionUnit, WeightUnit } from "./global";
import { ProductSupplier, ProductType, ProductWarehouse } from "./products";

export interface GetAllInventoryOptions {
  page?: number;
  direction?: "-1" | "1";
  limit?: number;
}

export interface Inventory {
  readonly _id: string;
  readonly id: number;
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
  readonly tenant_id: number;
  readonly created: number;
  readonly modified: number;
}

export interface ProductsInventory {
  id: number;
  archived: boolean;
  updated: boolean;
  type: ProductType;
  product_warehouses: ProductWarehouse[];
}

export interface ProductInventory {
  _id: number;
  location: string;
  product_id: number;
  tenant_id: number;
  warehouse_id: number;
  is_default: boolean;
  quantity: number;
  version?: number;
}
