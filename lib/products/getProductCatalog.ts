import Orderhive from "../index";
import {
  Product,
  ProductTypeMap,
  ReadableProductType,
  ProductStatusMap,
  ReadableProductStatus,
} from "./definitions";

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

interface SearchOptions {
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
interface FormattedSearchOptions {
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
interface ProductCatalogReturn {
  meta: CatalogMetadata;
  products: Product[];
}

export default async function getProductCatalog(
  this: Orderhive,
  options: SearchOptions
): Promise<ProductCatalogReturn> {
  let formattedOptions: FormattedSearchOptions = {};
  if (Object.keys(options).length === 0) {
    throw new Error("At least one option must be specified");
  }
  if (options.types) {
    let types = [];
    for (let each of options.types) types.push(ProductTypeMap[each]);
    formattedOptions.types = types;
  }
  if (options.statuses) {
    let statuses = [];
    for (let each of options.statuses) statuses.push(ProductStatusMap[each]);
    formattedOptions.statuses = statuses;
  }
  if (options.query) formattedOptions.query = options.query;
  if (options.tag_ids) formattedOptions.tag_ids = options.tag_ids;
  if (options.store_ids) formattedOptions.store_ids = options.store_ids;
  if (options.supplier_ids)
    formattedOptions.supplier_ids = options.supplier_ids;
  if (options.warehouse_ids)
    formattedOptions.warehouse_ids = options.warehouse_ids;
  if (options.category_ids)
    formattedOptions.category_ids = options.category_ids;
  if (options.archived) formattedOptions.archived = options.archived;
  if (options.qty_ranges) formattedOptions.query = options.query;
  if (options.date_ranges) formattedOptions.query = options.query;
  try {
    let path = `/product/listing/flat`;
    if (options.size || options.page) {
      let { page, size } = options;
      path = `${path}?`;
      if (size && page) path = `${path}page=${page}&size=${size}`;
      else {
        if (page) path = `${path}page=${page}`;
        if (size) path = `${path}size=${size}`;
      }
    }
    const headers = await this.signRequest("POST", path, formattedOptions);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, formattedOptions, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting product catalog`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
