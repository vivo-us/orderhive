import { IdSchema } from "../definitions/global";
import Orderhive from "../index";
import { ValidationError } from "joi";
import { AxiosError } from "axios";

/**
 * Deletes a transfer based on the ID provided
 *
 * @param {Orderhive} this
 * @param  {string} transferId - ID of transfer to delete
 * @returns {Promise<string>}
 */

export default async function deleteTransfer(
  this: Orderhive,
  transferId: string
): Promise<string> {
  let validatedTransferId;
  try {
    validatedTransferId = await IdSchema.validateAsync(transferId);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw new this.OrderhiveError(`${error.message}`);
    } else throw new this.OrderhiveError(error);
  }
  let res;
  try {
    let headers = await this.signRequest(
      "DELETE",
      `/stocktransfers/${validatedTransferId}`
    );
    res = await this.http.delete(`/stocktransfers/${validatedTransferId}`, {
      headers,
    });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new this.OrderhiveError(
        `Error deleting transfer ${validatedTransferId}: ${error.message}`,
        error.response?.data
      );
    } else throw new this.OrderhiveError(error);
  }
  this.logger.debug(`Successfully deleted transfer ${validatedTransferId}`);
  return res.data;
}

module.exports = deleteTransfer;
