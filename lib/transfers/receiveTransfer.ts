import { QuerySchema } from "./../definitions/global";
import {
  ReceiveTransferData,
  ReceiveTransferDataSchema,
  ShipTransferResponse,
} from "../definitions/transfers";
import Orderhive from "../index";
import { ValidationError } from "joi";
import { AxiosError } from "axios";

/** CustomField Definition
 * @typedef {Object} CustomField
 * @property {string} id - ID of custom field
 * @property {string} name - Name of custom field
 * @property {Boolean | string | object | string[]} value - Value of custom field
 * @property {"DROP_DOWN" | "TEXT" | "DATE" | "CHECKBOX" | "NUMBER" | "LINK"} type - Type of custom field
 */

/** ReceieveTransfer Definition
 * @typedef {Object} ReceiveTransfer
 * @property {string} id - Orderhive Product ID to receive
 * @property {number} received_qty - Quantity to receive
 * @property {number} broken_or_missing_qty - Quantity of broken or missing items
 * @property {CustomField[]} custom_fields - Custom fields to receive product with
 */

/**
 * Recieves a transfer based on the ID and data provided
 *
 * @param {string} transferId - ID of transfer to receive
 * @param {ReceiveTransfer[]} data - Data to ship transfer with
 * @returns {Promise<ShipTransferResponse>}
 */

export default async function receiveTransfer(
  this: Orderhive,
  transferId: string,
  data: ReceiveTransferData[]
): Promise<ShipTransferResponse> {
  try {
    data = await ReceiveTransferDataSchema.validateAsync(data);
    transferId = await QuerySchema.validateAsync(transferId);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw new this.OrderhiveError(`${error.message}`);
    } else throw new this.OrderhiveError(error);
  }
  let res;
  try {
    let url = `/stocktransfers/status/receive/${transferId}`;
    let headers = await this.signRequest("POST", url, data);
    res = await this.http.post(url, data, {
      headers,
    });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new this.OrderhiveError(error.message, error.response?.data);
    } else throw new this.OrderhiveError(error);
  }
  this.logger.debug(`Successfully received transfer ${transferId}`);
  return res.data;
}

module.exports = receiveTransfer;
