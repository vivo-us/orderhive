import Orderhive from "../index";
import { Product, UpdateProduct } from "./definitions";

export default async function updateProduct(
  this: Orderhive,
  productId: number,
  data: UpdateProduct
): Promise<Product> {
  try {
    const path = `/product/${productId}`;
    const headers = await this.signRequest("PUT", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error updating product`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
