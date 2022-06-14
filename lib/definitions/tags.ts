import { Timestamps } from "./global";
export interface NewTag {
  id: number;
  tag_id: number;
  tag_name: string;
  tag_color: string;
}

export type TagType =
  | "sales_order"
  | "item"
  | "customer"
  | "company"
  | "purchase_order";

export interface Tag extends Timestamps {
  id?: number;
  tag_id: number;
  count?: number;
  tag_name: string;
  tag_color: string;
}

export interface TagOptions {
  tag_name: string;
  type: TagType;
  tag_color?: string;
}
