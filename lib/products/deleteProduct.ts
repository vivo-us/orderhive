import Orderhive from "../index";

interface DeleteProductReturn {
  request_id: string;
}

export default async function deleteProduct(
  this: Orderhive,
  productIds: number[]
): Promise<DeleteProductReturn> {
  try {
    const obj = {
      product_ids: productIds,
    };
    const path = `/product/bulk/delete`;
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error deleting products`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
