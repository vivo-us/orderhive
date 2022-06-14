import {
  OptionalWeight,
  OptionalDimensions,
  Timestamps,
  Weight,
} from "./global";
import { Tag } from "./tags";

export type ProductType = 1 | 2 | 3 | 6 | 7;
export type ReadableProductType =
  | "SIMPLE"
  | "CONFIGURABLE"
  | "VIRTUAL"
  | "LINKED"
  | "BUNDLE";
export const ProductTypeMap = {
  SIMPLE: 1,
  CONFIGURABLE: 2,
  VIRTUAL: 3,
  LINKED: 6,
  BUNDLE: 7,
};

export type ProductStatus = 1 | 2 | 3;
export type ReadableProductStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
export const ProductStatusMap = {
  IN_STOCK: 1,
  LOW_STOCK: 2,
  OUT_OF_STOCK: 3,
};

interface ProductCategory extends Timestamps {
  id: number;
  name: string;
  description: string;
}
interface CreateSimpleProductCategory {
  id?: number;
  name: string;
}
interface UpdateProductCategory {
  name: string;
  description?: string;
}

interface ProductPrice extends Timestamps {
  price_id: 1 | 2;
  price: number;
  name: string;
}
interface CreateSimpleProductPrice {
  price: number;
  price_id: 1 | 2;
}

interface ProductCustomsInformation extends Timestamps, Weight {
  product_id: number;
  description: string;
  value: number;
  origin_country?: string;
  hs_tariff_number?: string;
}
interface CreateProductCustomsInformation extends Weight {
  description?: string;
  value: number;
  origin_country?: string;
  hs_tariff_number?: string;
}

interface ProductStore extends Timestamps {
  id: number;
  price: number;
  store_id: number;
  store_name: string;
  store_active: boolean;
  channel_id: number;
  channel_name: string;
  product_name: string;
  channel_primary_id: string;
  channel_secondary_id?: string;
  product_url?: string;
  quantity: number;
  product_sku: string;
  manage_stock_on_channel: boolean;
}
interface CreateProductStore {
  store_id: number;
  price: number;
}

type CustomFieldType = "DROP_DOWN" | "TEXT" | "DATE" | "CHECKBOX" | "NUMBER";
interface CustomField {
  id?: number;
  name: string;
  value: string | object | Array<string>;
  type: CustomFieldType;
  show_on_frontcard?: boolean;
}
interface CreateSimpleProductCustomField {
  id: string;
  value: string;
}
interface UpdateCustomField {
  id: number;
  value: string;
}

interface CreateProductTags {
  tag_id: number;
}
interface BundleComponents extends Timestamps {
  component_product_id: number;
  component_quantity: number;
  components: Array<Product>;
}
interface CreateBundleComponent {
  component_product_id: number;
  component_quantity: number;
}

interface StockUpdateRemark {
  source: string;
}
interface StockUpdateInventoryLevels {
  location?: string;
  batch?: string;
  cost?: number;
  quantity: number;
  is_default?: boolean;
}
export interface StockUpdateWarehouse {
  warehouse_id: number;
  on_hand_quantity: number;
  remark: StockUpdateRemark;
  inventory_levels?: StockUpdateInventoryLevels[];
}

interface WarehouseInventoryReturn {
  location: string;
  product_id: number;
  quantity: number;
  warehouse_id: number;
  is_default: boolean;
  batch: string;
  cost: number;
  tenant_id: number;
  updated: boolean;
}
interface StockWarehouseReturn {
  warehouse_id: number;
  on_hand_quantity: number;
  remark: StockUpdateRemark;
  updated: boolean;
  inventory_levels: WarehouseInventoryReturn;
}
export interface StockUpdateReturn {
  warehouses: StockWarehouseReturn[];
  purchaseOrderRequest: boolean;
}

export interface ProductWarehouse extends Timestamps {
  quantity: number;
  warehouse_id: number;
  warehouse_name: string;
  reserve_qty: number;
  purchase_qty: number;
  intransfer_qty: number;
  warehouse_city: string;
}

interface CreateConfigurableProductOptions {
  name: string;
  position: 1 | 2 | 3 | 4 | 5;
}

export interface ProductImage extends Timestamps {
  id: number;
  url: string;
  name: string;
  size: number;
  default_image: boolean;
}

export interface ProductSupplier extends Timestamps {
  email: string;
  supplier_id: number;
  first_name: string;
  buy_price?: number;
  default_supplier: boolean;
  supplier_sku?: string;
  order_qty?: number;
  lead_time?: number;
}
export interface CreateProductSupplier {
  supplier_id: number;
  buy_price?: number;
  default_supplier?: boolean;
  supplier_sku?: string;
  order_qty?: number;
  lead_time?: number;
}

export interface CreateConfigurableProductMember {
  name: string;
  sku: string;
  product_stores: Array<CreateProductStore>;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  option5?: string;
  product_prices?: Array<CreateSimpleProductPrice>;
  customs_information?: CreateProductCustomsInformation;
}
export interface MiniProduct {
  id: number;
  tenant_id: number;
  name: string;
  sku: string;
  lower_sku: string;
  barcode: string;
  qty: number;
  type: number;
  image: ProductImage;
  archived: boolean;
}
export interface Product
  extends Timestamps,
    OptionalDimensions,
    OptionalWeight {
  id: number;
  name: string;
  asin?: string;
  sku: string;
  description?: string;
  type: ProductType;
  quantity: number;
  brand?: string;
  barcode?: string;
  archived: boolean;
  fulfilled_by: string;
  updated: boolean;
  hsn_code?: string;
  threshold?: number;
  parent_id?: number;
  bundle_components?: Array<BundleComponents>;
  category?: ProductCategory;
  product_prices?: Array<ProductPrice>;
  product_warehouses: Array<ProductWarehouse>;
  product_stores: Array<ProductStore>;
  product_images?: Array<ProductImage>;
  product_suppliers?: Array<ProductSupplier>;
  tags?: Array<Tag>;
  custom_fields?: Array<CustomField>;
  customs_information: ProductCustomsInformation;
}

export interface CreateSimpleProduct
  extends OptionalDimensions,
    OptionalWeight {
  name: string;
  sku: string;
  description?: string;
  brand?: string;
  barcode?: string;
  hsn_code?: string;
  threshold?: number;
  category?: CreateSimpleProductCategory;
  product_prices?: Array<CreateSimpleProductPrice>;
  product_stores: Array<CreateProductStore>;
  tags?: Array<CreateProductTags>;
  custom_fields?: Array<CreateSimpleProductCustomField>;
  customs_information?: CreateProductCustomsInformation;
}

export interface CreateBundleProduct
  extends OptionalDimensions,
    OptionalWeight {
  name: string;
  sku: string;
  description?: string;
  barcode?: string;
  brand?: string;
  category?: CreateSimpleProductCategory;
  threshold?: number;
  bundle_components: Array<CreateBundleComponent>;
  custom_fields?: Array<CreateSimpleProductCustomField>;
  customs_information?: CreateProductCustomsInformation;
  product_prices?: Array<CreateSimpleProductPrice>;
  product_stores?: Array<CreateProductStore>;
  tags?: Array<CreateProductTags>;
}

export interface CreateConfigurableProduct
  extends OptionalDimensions,
    OptionalWeight {
  name: string;
  sku: string;
  members: Array<CreateConfigurableProductMember>;
  product_stores: Array<CreateProductStore>;
  product_options: Array<CreateConfigurableProductOptions>;
  description?: string;
  brand?: string;
  barcode?: string;
  hsn_code?: string;
  threshold?: number;
  category?: CreateSimpleProductCategory;
  product_prices?: Array<CreateSimpleProductPrice>;
  tags?: Array<CreateProductTags>;
  custom_fields?: Array<CreateSimpleProductCustomField>;
  customs_information?: CreateProductCustomsInformation;
}

export interface UpdateProduct extends OptionalDimensions, OptionalWeight {
  name?: string;
  sku?: string;
  description?: string;
  brand?: string;
  barcode?: string;
  hsn_code?: string;
  threshold?: number;
  category?: UpdateProductCategory;
  product_prices?: Array<CreateSimpleProductPrice>;
  product_stores?: Array<CreateProductStore>;
  tags?: Array<CreateProductTags>;
  custom_fields?: Array<UpdateCustomField>;
  customs_information?: CreateProductCustomsInformation;
}

export interface DeleteProductResponse {
  request_id: string;
}

interface QtyRange {
  key: string;
  warehouse_id: number;
  min: number;
  max: number;
}
interface DateRange {
  key: "created" | "modified";
  min: number;
  max: number;
}

export interface SearchOptions {
  query?: string;
  size?: number;
  page?: number;
  types?: ReadableProductType[];
  statuses?: ReadableProductStatus[];
  tag_ids?: number[];
  store_ids?: number[];
  supplier_ids?: number[];
  warehouse_ids?: number[];
  category_ids?: number[];
  archived?: boolean;
  qty_ranges?: QtyRange;
  date_ranges?: DateRange;
}
export interface FormattedSearchOptions {
  query?: string;
  types?: number[];
  statuses?: number[];
  tag_ids?: number[];
  store_ids?: number[];
  supplier_ids?: number[];
  warehouse_ids?: number[];
  category_ids?: number[];
  archived?: boolean;
  qty_ranges?: QtyRange;
  date_ranges?: DateRange;
}

interface CatalogMetadata {
  current_page: number;
  records_per_page: number;
}
export interface ProductCatalogResponse {
  meta: CatalogMetadata;
  products: Product[];
}
