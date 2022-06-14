import Orderhive from "../index";
import { Product, CreateBundleProduct } from "../definitions/products";

export default async function createBundleProduct(
  this: Orderhive,
  data: CreateBundleProduct
): Promise<Product> {
  try {
    const path = `/product/bundle`;
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error creating bundle product`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
