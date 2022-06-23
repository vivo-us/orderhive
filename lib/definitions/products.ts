import joi from "joi";
import {
  OptionalWeight,
  OptionalDimensions,
  Timestamps,
  Weight,
  IdSchema,
  WeightUnit,
  DimensionUnit,
  WeightUnitSchema,
  DimensionUnitSchema,
  IdArraySchema,
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

const SimpleProductCategorySchema = joi.object().keys({
  id: IdSchema,
  name: joi.string().required(),
});
interface CreateSimpleProductCategory {
  id?: number;
  name: string;
}

const UpdateProductCategorySchema = joi.object().keys({
  name: joi.string().required(),
  description: joi.string(),
});
interface UpdateProductCategory {
  name: string;
  description?: string;
}

interface ProductPrice extends Timestamps {
  price_id: 1 | 2;
  price: number;
  name: string;
}

const CreateSimpleProductPriceSchema = joi.array().items(
  joi.object().keys({
    price: joi.number().positive().required(),
    price_id: joi.number().valid(1, 2).required(),
  })
);
interface CreateSimpleProductPrice {
  price: number;
  price_id: 1 | 2;
}

const ProductCustomsSchema = joi.object().keys({
  description: joi.string().optional(),
  value: joi.number().positive().required(),
  origin_country: joi.string().length(2).optional(),
  hs_tariff_number: joi.string().optional(),
  weight: joi.number().positive().required(),
  weight_unit: WeightUnitSchema.required(),
});
interface ProductCustomsInformation extends Timestamps {
  product_id: number;
  description: string;
  value: number;
  origin_country?: string;
  hs_tariff_number?: string;
  weight: number;
  weight_unit: WeightUnit;
}

const CreateProductCustomsInformationSchema = joi.object().keys({
  description: joi.string().optional(),
  value: joi.number().positive().required(),
  origin_country: joi.string().length(2).optional(),
  hs_tariff_number: joi.string().optional(),
  weight: joi.number().positive().required(),
  weight_unit: WeightUnitSchema.required(),
});
interface CreateProductCustomsInformation {
  description?: string;
  value: number;
  origin_country?: string;
  hs_tariff_number?: string;
  weight: number;
  weight_unit: WeightUnit;
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

const CreateProductStoreSchema = joi.array().items(
  joi.object().keys({
    store_id: IdSchema.required(),
    price: joi.number().positive().required(),
  })
);
interface CreateProductStore {
  store_id: number;
  price: number;
}

type CustomFieldType = "DROP_DOWN" | "TEXT" | "DATE" | "CHECKBOX" | "NUMBER";
interface CustomField {
  id?: number;
  name: string;
  value: string | object | string[] | object[];
  type: CustomFieldType;
  show_on_frontcard?: boolean;
}

const CreateCustomFieldSchema = joi.object().keys({
  id: IdSchema.required(),
  value: joi
    .alternatives()
    .try(
      joi.string(),
      joi.object(),
      joi.array().items(joi.alternatives().try(joi.string(), joi.object()))
    )
    .required(),
});
interface CreateSimpleProductCustomField {
  id: string;
  value: string;
}
interface UpdateCustomField {
  id: string;
  value: string | object | string[] | object[];
}

const CreateProductTagsSchema = joi.object().keys({
  id: IdSchema.required(),
});
interface CreateProductTags {
  tag_id: number;
}
interface BundleComponents extends Timestamps {
  component_product_id: number;
  component_quantity: number;
  components: Product[];
}

const CreateBundleComponentSchema = joi.object().keys({
  component_product_id: IdSchema.required(),
  component_quantity: joi.number().positive().integer().required(),
});

interface CreateBundleComponent {
  component_product_id: number;
  component_quantity: number;
}

interface StockUpdateRemark {
  source: string;
}

const InventoryLevelsSchema = joi.object().keys({
  location: joi.string(),
  batch: joi.string(),
  cost: joi.number().positive(),
  quantity: joi.number().positive().integer().required(),
  is_default: joi.boolean(),
});
interface StockUpdateInventoryLevels {
  location?: string;
  batch?: string;
  cost?: number;
  quantity: number;
  is_default?: boolean;
}

export const StockDataSchema = joi.array().items(
  joi.object().keys({
    warehouse_id: IdSchema.required(),
    on_hand_quantity: joi.number().positive().integer().required(),
    remark: joi.object().keys({ source: joi.string().required() }).required(),
    inventory_levels: joi.array().items(InventoryLevelsSchema),
  })
);
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

const ConfigurableProductOptionsSchema = joi.object().keys({
  name: joi.string().required(),
  position: joi.number().valid(1, 2, 3, 4, 5).required(),
});
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

export const CreateProductSupplierSchema = joi.object().keys({
  supplier_id: IdSchema.required(),
  buy_price: joi.number().positive().optional(),
  default_supplier: joi.boolean().optional(),
  supplier_sku: joi.string().optional(),
  order_qty: joi.number().positive().integer().optional(),
  lead_time: joi.number().positive().integer().optional(),
});

export interface CreateProductSupplier {
  supplier_id: number;
  buy_price?: number;
  default_supplier?: boolean;
  supplier_sku?: string;
  order_qty?: number;
  lead_time?: number;
}

const ConfigProductMemberSchema = joi
  .object()
  .keys({
    name: joi.string().required(),
    sku: joi.string().required(),
    product_stores: CreateProductStoreSchema.required(),
    option1: joi.string(),
    option2: joi.string(),
    option3: joi.string(),
    option4: joi.string(),
    option5: joi.string(),
    product_prices: CreateSimpleProductPriceSchema.optional(),
    customs_information: ProductCustomsSchema.optional(),
  })
  .or("option1", "option2", "option3", "option4", "option5");

export const CreateConfigProductMemberSchema = joi
  .array()
  .items(ConfigProductMemberSchema)
  .required();
export interface CreateConfigurableProductMember {
  name: string;
  sku: string;
  product_stores: CreateProductStore[];
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  option5?: string;
  product_prices?: CreateSimpleProductPrice[];
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
export interface Product extends Timestamps {
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
  bundle_components?: BundleComponents[];
  category?: ProductCategory;
  product_prices?: ProductPrice[];
  product_warehouses: ProductWarehouse[];
  product_stores: ProductStore[];
  product_images?: ProductImage[];
  product_suppliers?: ProductSupplier[];
  tags?: Tag[];
  custom_fields?: CustomField[];
  customs_information: ProductCustomsInformation;
  weight?: number;
  weight_unit?: WeightUnit;
  height?: number;
  length?: number;
  width?: number;
  measurement_unit?: DimensionUnit;
}

export const CreateProductSchema = joi.object().keys({
  name: joi.string().required(),
  sku: joi.string().required(),
  description: joi.string().optional(),
  brand: joi.string().optional(),
  barcode: joi.string().optional(),
  hsn_code: joi.string().optional(),
  threshold: joi.number().integer().optional(),
  category: SimpleProductCategorySchema,
  product_prices: joi.array().items(CreateSimpleProductPriceSchema),
  product_stores: joi.array().items(CreateProductStoreSchema).required(),
  tags: joi.array().items(CreateProductTagsSchema),
  custom_fields: joi.array().items(CreateCustomFieldSchema),
  customs_information: CreateProductCustomsInformationSchema,
  weight: joi.number().positive(),
  weight_unit: WeightUnitSchema,
  height: joi.number().positive(),
  length: joi.number().positive(),
  width: joi.number().positive(),
  measurement_unit: DimensionUnitSchema,
});
export interface CreateSimpleProduct {
  name: string;
  sku: string;
  description?: string;
  brand?: string;
  barcode?: string;
  hsn_code?: string;
  threshold?: number;
  category?: CreateSimpleProductCategory;
  product_prices?: CreateSimpleProductPrice[];
  product_stores: CreateProductStore[];
  tags?: CreateProductTags[];
  custom_fields?: CreateSimpleProductCustomField[];
  customs_information?: CreateProductCustomsInformation;
  weight?: number;
  weight_unit?: WeightUnit;
  height?: number;
  length?: number;
  width?: number;
  measurement_unit?: DimensionUnit;
}

export const CreateBundleProductSchema = joi
  .object()
  .keys({
    name: joi.string().required(),
    sku: joi.string().required(),
    description: joi.string(),
    barcode: joi.string(),
    brand: joi.string(),
    category: SimpleProductCategorySchema,
    threshold: joi.number().positive().integer().optional(),
    bundle_components: joi
      .array()
      .items(CreateBundleComponentSchema)
      .required(),
    custom_fields: joi.array().items(CreateCustomFieldSchema),
    customs_information: CreateProductCustomsInformationSchema,
    product_prices: joi.array().items(CreateSimpleProductPriceSchema),
    product_stores: joi.array().items(CreateProductStoreSchema),
    tags: joi.array().items(CreateProductTagsSchema),
    weight: joi.number().positive(),
    weight_unit: WeightUnitSchema,
    height: joi.number().positive(),
    length: joi.number().positive(),
    width: joi.number().positive(),
    measurement_unit: DimensionUnitSchema,
  })
  .required();

export interface CreateBundleProduct {
  name: string;
  sku: string;
  description?: string;
  barcode?: string;
  brand?: string;
  category?: CreateSimpleProductCategory;
  threshold?: number;
  bundle_components: CreateBundleComponent[];
  custom_fields?: CreateSimpleProductCustomField[];
  customs_information?: CreateProductCustomsInformation;
  product_prices?: CreateSimpleProductPrice[];
  product_stores?: CreateProductStore[];
  tags?: CreateProductTags[];
  weight?: number;
  weight_unit?: WeightUnit;
  height?: number;
  length?: number;
  width?: number;
  measurement_unit?: DimensionUnit;
}

export const CreateConfigurableProductSchema = joi.object().keys({
  name: joi.string().required(),
  sku: joi.string().required(),
  members: CreateConfigProductMemberSchema.required(),
  product_stores: joi.array().items(CreateProductStoreSchema).required(),
  product_options: joi
    .array()
    .items(ConfigurableProductOptionsSchema)
    .required(),
  description: joi.string(),
  brand: joi.string(),
  barcode: joi.string(),
  hsn_code: joi.string(),
  threshold: joi.number().positive().integer().optional(),
  category: SimpleProductCategorySchema,
  product_prices: joi.array().items(CreateSimpleProductPriceSchema),
  tags: joi.array().items(CreateProductTagsSchema),
  custom_fields: joi.array().items(CreateCustomFieldSchema),
  customs_information: CreateProductCustomsInformationSchema,
  weight: joi.number().positive(),
  weight_unit: WeightUnitSchema,
  height: joi.number().positive(),
  length: joi.number().positive(),
  width: joi.number().positive(),
  measurement_unit: DimensionUnitSchema,
});
export interface CreateConfigurableProduct {
  name: string;
  sku: string;
  members: CreateConfigurableProductMember[];
  product_stores: CreateProductStore[];
  product_options: CreateConfigurableProductOptions[];
  description?: string;
  brand?: string;
  barcode?: string;
  hsn_code?: string;
  threshold?: number;
  category?: CreateSimpleProductCategory;
  product_prices?: CreateSimpleProductPrice[];
  tags?: CreateProductTags[];
  custom_fields?: CreateSimpleProductCustomField[];
  customs_information?: CreateProductCustomsInformation;
  weight?: number;
  weight_unit?: WeightUnit;
  height?: number;
  length?: number;
  width?: number;
  measurement_unit?: DimensionUnit;
}

export const UpdateProductSchema = joi.object().keys({
  name: joi.string(),
  sku: joi.string(),
  description: joi.string(),
  brand: joi.string(),
  barcode: joi.string(),
  hsn_code: joi.string(),
  threshold: joi.number().integer().positive(),
  category: UpdateProductCategorySchema,
  product_prices: joi.array().items(CreateSimpleProductPriceSchema),
  product_stores: joi.array().items(CreateProductStoreSchema),
  tags: joi.array().items(CreateProductTagsSchema),
  custom_fields: joi.array().items(CreateCustomFieldSchema),
  customs_information: CreateProductCustomsInformationSchema,
  weight: joi.number().positive(),
  weight_unit: WeightUnitSchema,
  height: joi.number().positive(),
  length: joi.number().positive(),
  width: joi.number().positive(),
  measurement_unit: DimensionUnitSchema,
});
export interface UpdateProduct {
  name?: string;
  sku?: string;
  description?: string;
  brand?: string;
  barcode?: string;
  hsn_code?: string;
  threshold?: number;
  category?: UpdateProductCategory;
  product_prices?: CreateSimpleProductPrice[];
  product_stores?: CreateProductStore[];
  tags?: CreateProductTags[];
  custom_fields?: UpdateCustomField[];
  customs_information?: CreateProductCustomsInformation;
  weight?: number;
  weight_unit?: WeightUnit;
  height?: number;
  length?: number;
  width?: number;
  measurement_unit?: DimensionUnit;
}

export interface DeleteProductResponse {
  request_id: string;
}

const QtyRangeSchema = joi.object().keys({
  key: joi.string(),
  warehouse_id: joi.number().integer().positive(),
  min: joi.number().integer().positive(),
  max: joi.number().integer().positive(),
});
interface QtyRange {
  key: string;
  warehouse_id: number;
  min: number;
  max: number;
}

const DateRangeSchema = joi.object().keys({
  key: joi.string(),
  min: joi.number().integer().positive(),
  max: joi.number().integer().positive(),
});
interface DateRange {
  key: "created" | "modified";
  min: number;
  max: number;
}

export const SearchOptionsSchema = joi.object().keys({
  query: joi.string(),
  size: joi.number().integer().positive(),
  page: joi.number().integer().positive(),
  types: joi.valid("SIMPLE", "CONFIGURABLE", "VIRTUAL", "LINKED", "BUNDLE"),
  statuses: joi.valid(1, 2, 3, 6, 7),
  tag_ids: IdArraySchema,
  store_ids: IdArraySchema,
  supplier_ids: IdArraySchema,
  warehouse_ids: IdArraySchema,
  category_ids: IdArraySchema,
  archived: joi.boolean(),
  qty_ranges: QtyRangeSchema,
  date_ranges: DateRangeSchema,
});
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
