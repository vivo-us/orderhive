import listWarehouses from "./listWarehouses";
import getWarehouseDetails from "./getWarehouseDetails";

export interface Warehouse {
  id: number;
  created: string;
  modified: string;
  name: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  state_code?: string;
  zipcode?: string;
  country_name: string;
  email: string;
  type: string;
  is_default: boolean;
  contact_no: string;
  contact_name: string;
  dropshipper_policy: string;
}

export default {
  listWarehouses,
  getWarehouseDetails,
};
