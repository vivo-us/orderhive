import { QuerySchema } from "./../definitions/global";
import {
  ShipTransferData,
  ShipTransferDataSchema,
  ShipTransferResponse,
} from "../definitions/transfers";
import Orderhive from "../index";
import { ValidationError } from "joi";
import { AxiosError } from "axios";

/** Lbcdetails Definition
 * @typedef {Object} Lbcdetail
 * @property {string} id - ID of location to remove stock from
 * @property {number} quantity - Quantity to remove from location
 * @property {string} location - Location to remove stock from
 */

/** ShipTransfer Definition
 * @typedef {Object} ShipTransfer
 * @property {number} id - Orderhive Product ID to ship
 * @property {Lbcdetail[]} lbcdetails - Lbcdetails to ship with
 */

/** shipTransfer Definition
 * @param {string} transferId - ID of transfer to ship
 * @param {ShipTransfer[]} data - Data to ship transfer with
 * @returns {Promise<ShipTransferResponse>}
 */

export default async function shipTransfer(
  this: Orderhive,
  transferId: string,
  data: ShipTransferData[]
) {
  try {
    data = await ShipTransferDataSchema.validateAsync(data);
    transferId = await QuerySchema.validateAsync(transferId);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw new this.OrderhiveError(`${error.message}`);
    } else throw new this.OrderhiveError(error);
  }
  let payload = data.map((d) => {
    return {
      id: d.id,
      lbcdetails: d.lbcdetails,
      product_details: d.product_details || [],
    };
  });
  let res;
  try {
    let url = `/stocktransfers/status/ship/${transferId}`;
    let headers = await this.signRequest("POST", url, payload);
    res = await this.http.post(url, payload, {
      headers,
    });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new this.OrderhiveError(error.message, error.response?.data);
    } else throw new this.OrderhiveError(error);
  }
  this.logger.info(`Successfully shipped transfer ${transferId}`);
  return res.data;
}

module.exports = shipTransfer;
