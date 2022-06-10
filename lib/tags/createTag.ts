import Orderhive from "../index";

type TagType =
  | "sales_order"
  | "item"
  | "customer"
  | "company"
  | "purchase_order";

interface Obj {
  tag_name: string;
  type: TagType;
  tag_color?: string;
}

interface NewTag {
  id: number;
  tag_id: number;
  tag_name: string;
  tag_color: string;
}

export default async function createTag(
  this: Orderhive,
  name: string,
  type: TagType,
  color?: string
): Promise<NewTag | typeof this.OrderhiveError> {
  if (color && (color.length !== 7 || color.charAt(0) !== "#")) {
    throw new Error(
      "Color must be a valid 7 characters long hex code including the starting #"
    );
  }
  try {
    let obj: Obj = {
      tag_name: name,
      type,
    };
    if (color) obj.tag_color = color;
    let path = "/orders/tags";
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.data?.errors.includes("Tag already exists.")) {
        throw new this.OrderhiveError(
          "Tag already exists",
          error.response.data
        );
      } else {
        throw new this.OrderhiveError(
          "Error creating tag",
          error.response.data
        );
      }
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
