export interface UserDetails {
  address1: string;
  auto_invoice: boolean;
  auto_recharge: boolean;
  backorder: boolean;
  city: string;
  company_name: string;
  config: string;
  contact_no: string;
  country_name: string;
  created: string;
  currency_id: number;
  custom_template: string;
  date_format: string;
  default_invoice_template: string;
  default_so_template: string;
  default_store_id: number;
  easypost_userid: string;
  enable_location: boolean;
  enable_tracking: boolean;
  id: number;
  invoice_template: string;
  logo: string;
  modified: string;
  order_view_type: string;
  package_template: string;
  packing_length: string;
  packing_option: string;
  packing_weight: string;
  payment_method: number;
  po_template: string;
  shipment_template: string;
  so_template: string;
  state: string;
  stripe_amount: number;
  stripe_recharge: number;
  stripe_threshold: number;
  tax_calculation: string;
  tax_option: string;
  tax_type: string;
  threshold: number;
  user_id: number;
  utm_source: string;
  view_store_name: boolean;
  view_type: string;
  wallet_limit: number;
  wallet_total: number;
  website_url: string;
  zipcode: string;
}

export interface TimezoneObject {
  id: number;
  name: string;
  timezone: string;
}

export interface User {
  active: boolean;
  billing_portal_url: string;
  billing_type: string;
  cancel: boolean;
  company_name: string;
  contact_no: string;
  country_name: string;
  created: string;
  department: string;
  enable_printhive: boolean;
  expired: boolean;
  extend: boolean;
  id: number;
  invite: boolean;
  lastAttempt: string;
  lastLogin: string;
  login_attempt: number;
  modified: string;
  name: string;
  plan_id: number;
  reply_to: string;
  role: string;
  role_id: number;
  tenant_id: number;
  timezone: string;
  timezone_id: number;
  username: string;
  timezone_object: TimezoneObject;
  user_details: UserDetails;
}

export interface ListUsersResponse {
  count: number;
  total_count: number;
  users: User[];
}
