export interface Payment {
  id: number;
  payment_date: string;
  channel_id: number;
  payment_id: number;
  store_id: number;
  payment_method: string;
  sales_order_id: number;
  invoice_id: number;
  amount: number;
  comment: string;
  created: string;
  modified: string;
  type: number;
  refund: number;
  channel_payment_id: string;
}
