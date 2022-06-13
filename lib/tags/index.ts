import createTag from "./createTag";
import listTags from "./listTags";
import addTag from "./addTag";

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

export interface Tag {
  id?: number;
  tag_id: number;
  count?: number;
  tag_name: string;
  tag_color: string;
  created?: string;
  modified?: string;
}
export default {
  createTag,
  listTags,
  addTag,
};
