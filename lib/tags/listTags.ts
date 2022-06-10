import Orderhive from "../index";

type TagType =
  | "sales_order"
  | "item"
  | "customer"
  | "company"
  | "purchase_order";

interface Tag {
  id: number;
  tag_id: number;
  count: number;
  tag_name: string;
  tag_color: string;
}

export default async function listTags(
  this: Orderhive,
  type: TagType
): Promise<Array<Tag> | typeof this.OrderhiveError> {
  try {
    let path = `/orders/tags/${type}/all`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError("Error getting tags", error.response.data);
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
