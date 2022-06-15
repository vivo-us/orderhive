import Orderhive from "../index";
import { MiniProduct } from "../definitions/products";
import { QuerySchema } from "../definitions/global";

/**
 * @param  {string} query
 * @return {Promise<MiniProduct[]>}
 */

export default async function searchProducts(
  this: Orderhive,
  query: string
): Promise<MiniProduct[]> {
  await QuerySchema.required().validateAsync(query);
  try {
    const path = `/product/index/elastic/search?query=${query}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data.products;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error searching products from ${query}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
