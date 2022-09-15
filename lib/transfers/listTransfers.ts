import {
  TransferStatusOptions,
  ListTransfersPayload,
} from "./../definitions/transfers";
import Orderhive from "../index";
import { ValidationError } from "joi";
import { AxiosError } from "axios";
import {
  ListTransfersOptionsSchema,
  ListTransfersOptions,
  ListTransfersResponse,
} from "../definitions/transfers";

/**
 * @typedef { "RAISED" | "SHIPPED"| "PARTIALLY_RECEIVED"| "RECEIVED"| "CANCELLED" | "COMPLETED" } TransferStatusOptionsJs - Status of transfer
 */

/**
 * @typedef {Object} ListTransfersOptionsJs
 * @property {number} page - Page number to get transfers from
 * @property {string[]} folder_ids - Folder ids to get transfers from
 */

/**
 * Fetches a list of transfers based on the options provided
 *
 * **NOTE: The status field is required**
 *
 * Returns undefined if no transfers are found
 *
 * @param {TransferStatusOptionsJs} status - Status of transfers to fetch
 * @param {ListTransfersOptionsJs} [options] - List Transfer Options
 * @returns {Promise<ListTransfersResponse | undefined>}
 */

export default async function listTransfers(
  this: Orderhive,
  status: TransferStatusOptions,
  options?: ListTransfersOptions
): Promise<ListTransfersResponse | undefined> {
  try {
    options = await ListTransfersOptionsSchema.validateAsync(options);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw new this.OrderhiveError(`${error.message}`);
    } else throw new this.OrderhiveError(error);
  }
  let res;
  try {
    let url = `/stocktransfers/listing?page=${options?.page || 1}`;
    let payload: ListTransfersPayload = { status };
    if (options?.folder_ids) payload.folder_ids = options.folder_ids;
    let headers = await this.signRequest("POST", url, payload);
    res = await this.http.post(url, payload, { headers });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new this.OrderhiveError(error.message, error.response?.data);
    } else throw new this.OrderhiveError(error);
  }
  this.logger.info(`Successfully fetched transfers list`);
  return res.data;
}

module.exports = listTransfers;
