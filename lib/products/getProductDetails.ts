import Orderhive from "../index";
import { Product } from "../definitions/products";

/**
 * @param  {number} productId - Orderhive Product ID
 * @return {Promise<Product>} - Product details from Orderhive
 */

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
        `Error getting details for product ${productId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
