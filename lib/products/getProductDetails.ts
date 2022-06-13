import Orderhive from "../index";
import { Product } from "./definitions";

export default async function getProductDetails(
  this: Orderhive,
  productId: number
): Promise<Product> {
  try {
    const path = `/product/${productId}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting product details`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
