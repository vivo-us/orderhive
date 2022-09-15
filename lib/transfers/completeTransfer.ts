import { QuerySchema } from "./../definitions/global";
import Orderhive from "../index";
import { ValidationError } from "joi";
import { AxiosError } from "axios";
import { ShipTransferResponse } from "../definitions/transfers";

/**
 * Moves a transfer to the complete state based on the ID provided
 *
 * @param {string} transferId - ID of transfer to complete
 * @returns {Promise<ShipTransferResponse>}
 */

export default async function completeTransfer(
  this: Orderhive,
  transferId: string
): Promise<ShipTransferResponse> {
  try {
    transferId = await QuerySchema.validateAsync(transferId);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw new this.OrderhiveError(`${error.message}`);
    } else throw new this.OrderhiveError(error);
  }
  let res;
  try {
    let url = `/stocktransfers/status/${transferId}`;
    let headers = await this.signRequest("PUT", url, {});
    res = await this.http.put(url, {}, { headers });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new this.OrderhiveError(error.message, error.response?.data);
    } else throw new this.OrderhiveError(error);
  }
  this.logger.info(`Successfully completed transfer ${transferId}`);
  return res.data;
}

module.exports = completeTransfer;
