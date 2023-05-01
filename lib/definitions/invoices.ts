import joi from "joi";
import {
  Address,
  IdSchema,
  Timestamps,
  Weight,
  CreateAddressSchema,
  CreateAddress,
  WeightUnitSchema,
  WeightUnit,
} from "./global";

export interface Invoices {
  currency_symbol: string;
  is_extra_charged: boolean;
  currency: string;
  sales_order_id: number;
  order_total: number;
  data: [Invoice];
}

export interface Invoice {
  address_verification?: boolean;
  id: number;
  invoice_date: string;
  due_date: string;
  is_extra_charged: boolean;
  order_total: number;
  status: string;
  total: number;
  contact_id: number;
  payment_term: string;
  note: string;
  meta_data: object;
  invoice_store: [];
  invoice_items: [InvoiceItem];
  invoice_extra_items: [];
  invoice_shipping_item: object;
  created: string;
  modified: string;
  invoice_id: string;
}

export interface InvoiceItem {
  name: string;
  sku: string;
  price: number;
  tax: number;
  discount: number;
  total: number;
  sales_order_item_id: number;
  item_id: number;
  tax_id: number;
  tax_info: object | null;
  qty_invoiced: number;
  discount_percent: number;
  tax_percent: number;
  meta_data: string | null;
}

export interface getInvoices {}
