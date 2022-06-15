import Orderhive from "../index";

/**
 * @param  {number} productId
 * @param  {number} supplierId
 * @return {Promise<undefined>}
 */

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
        `Error updating supplier ${supplierId} for product ${productId}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
