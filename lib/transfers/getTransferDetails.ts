import { QuerySchema } from "./../definitions/global";
import Orderhive from "../index";
import { ValidationError } from "joi";
import { AxiosError } from "axios";
import { Transfer } from "../definitions/transfers";

/** getTransfer Definition
 * @param {string} transferId - ID of transfer to get
 * @returns {Promise<Transfer>}
 */

export default async function getTransfer(this: Orderhive, transferId: string) {
  try {
    transferId = await QuerySchema.validateAsync(transferId);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw new this.OrderhiveError(`${error.message}`);
    } else throw new this.OrderhiveError(error);
  }
  let res;
  try {
    let url = `/stocktransfers/${transferId}`;
    let headers = await this.signRequest("GET", url);
    res = await this.http.get(url, { headers });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new this.OrderhiveError(error.message, error.response?.data);
    } else throw new this.OrderhiveError(error);
  }
  this.logger.info(`Successfully fetched transfer ${transferId}`);
  return res.data;
}

module.exports = getTransfer;
