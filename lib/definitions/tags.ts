import joi from "joi";
import { HexColorSchema, Timestamps } from "./global";
export interface NewTag {
  id: number;
  tag_id: number;
  tag_name: string;
  tag_color: string;
}

export const TageTypeSchema = joi
  .string()
  .valid("sales_order", "item", "customer", "company", "purchase_order");
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

export const TagData = joi.object().keys({
  tag_name: joi.string().required(),
  type: TageTypeSchema.required(),
  tag_color: HexColorSchema,
});
export interface TagData {
  tag_name: string;
  type: TagType;
  tag_color?: string;
}
