import Orderhive from "../index";
import { ProductSupplier, CreateProductSupplier } from "./definitions";

export default async function addSupplierToProduct(
  this: Orderhive,
  productId: number,
  data: CreateProductSupplier
): Promise<ProductSupplier> {
  try {
    const path = `/product/${productId}/supplier`;
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error adding supplier to product`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
