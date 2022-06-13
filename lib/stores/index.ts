import listStores from "./listStores";
import getStoreDetails from "./getStoreDetails";

interface LastAccessRecord {
  id: number;
  last_order_id: string;
  last_order_page: number;
  last_token_generation_time?: string;
  last_order_to_date?: string;
}

interface StockPolicy {
  id: number;
  created: string;
  modified: string;
  store_id: number;
  warehouse_id: number;
  add_qty_value?: number;
  add_incoming_qty_value?: number;
  external_warehouse_id?: number;
  tenant_id: number;
}

export interface Store {
  id: number;
  created: string;
  modified: string;
  name: string;
  url?: string;
  key1?: string;
  key2?: string;
  key3?: string;
  key4?: string;
  key5?: string;
  interval2?: number;
  tenant_id: number;
  channel_id: number;
  channel_type: string;
  warehouse_id: number;
  warehouse_name: string;
  stock_policy: string;
  currency_id?: number;
  order_from_date?: string;
  inventory_update: boolean;
  order_update: boolean;
  price_update: boolean;
  active: boolean;
  resync: boolean;
  store_config?: string;
  last_access_record_id?: number;
  last_access_record?: LastAccessRecord;
  last_inventory_sync: string;
  inventory_sync_interval: number;
  last_sync_time2?: string;
  stock_policy_warehouse_ids?: Array<StockPolicy>;
}

export default {
  listStores,
  getStoreDetails,
};
