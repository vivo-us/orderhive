import Orderhive from "../index";
import { ProductSupplier, CreateProductSupplier } from "./definitions";

export default async function updateProductSupplier(
  this: Orderhive,
  productId: number,
  data: CreateProductSupplier
): Promise<ProductSupplier> {
  try {
    const path = `/product/${productId}/supplier`;
    const headers = await this.signRequest("PUT", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.put(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error updating supplier for product`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
