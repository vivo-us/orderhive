import Orderhive from "../index";
import { ProductSupplier, CreateProductSupplier } from "./definitions";

export default async function updateProductSupplier(
  this: Orderhive,
  productId: number,
  supplierId: number
): Promise<undefined> {
  try {
    const path = `/product/${productId}/supplier/${supplierId}`;
    const headers = await this.signRequest("DELETE", path);
    if (!headers) throw new Error("Could not sign request");
    await this.http.delete(path, { headers });
    this.logger.info(`Successfully deleted supplier from product`);
    return;
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
