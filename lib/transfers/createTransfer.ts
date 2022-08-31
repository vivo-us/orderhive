import {
  CreateTransferData,
  CreateTransferDataSchema,
  CreateTransferResponse,
} from "./../definitions/transfers";
import Orderhive from "../index";
import { DateTime } from "luxon";
import { ValidationError } from "joi";
import { AxiosError } from "axios";

/** FolderDetails Definition
 * @typedef {Object} FolderDetails
 * @property {string} folder_id - ID of folder to create transfer in
 * @property {string} folder_name - Name of folder to create transfer in
 */

/** CustomField Definition
 * @typedef {Object} CustomField
 * @property {string} [id] - ID of custom field
 * @property {string} name - Name of custom field
 * @property {Boolean | string | object | string[]} value - Value of custom field
 * @property {"DROP_DOWN" | "TEXT" | "DATE" | "CHECKBOX" | "NUMBER" | "LINK"} type - Type of custom field
 */

/** TransferWarehouse Definition
 * @typedef {Object} TransferWarehouse
 * @property {number} warehouse_id - ID of warehouse to transfer to/from
 */

/** TransferStockItem Definition
 * @typedef {Object} TransferStockItem
 * @property {number} item_price - Price of item to transfer
 * @property {number} product_id - Orderhive ID of product to transfer
 * @property {number} transfer_qty - Quantity to transfer
 * @property {CustomField[]} [custom_fields] - Custom fields to transfer product with
 * @property {string} [item_note] - Note to attach to item
 */

/** CreateTransfer Definition
 * @typedef {Object} CreateTransfer
 * @property {string} orderId - ID to give the order
 * @property {boolean} break_bundle_into_components - Whether to break the bundles into components
 * @property {TransferWarehouse} destination_warehouse - Warehouse to transfer to
 * @property {TransferWarehouse} source_warehouse - Warehouse to transfer from
 * @property {TransferStockItem[]} stock_transfer_items - Stock items to transfer
 * @property {Date} transfer_date - Date to transfer items to/from
 * @property {boolean} readyForShipment - Whether the transfer is ready for shipment
 * @property {FolderDetails} [folder_detail] - Folder to create transfer in
 * @property {CustomField[]} [custom_fields] - Custom fields to transfer with
 * @property {Date} [pickupDate] - Date to pickup items
 * @property {Date} [eta] - Date items will arrive
 * @property {string} [transfer_description] - Description of transfer
 */

/** createTransfer Definition
 * @param {CreateTransfer} data - Data to create transfer with
 * @returns {Promise<CreateTransferResponse>}
 */

export default async function createTransfer(
  this: Orderhive,
  data: CreateTransferData
) {
  try {
    data = await CreateTransferDataSchema.validateAsync(data);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw new this.OrderhiveError(`${error.message}`);
    } else throw new this.OrderhiveError(error);
  }
  let payload = {
    break_bundle_into_components: data.break_bundle_into_components,
    destination_warehouse: data.destination_warehouse,
    source_warehouse: data.source_warehouse,
    stock_transfer_items: data.stock_transfer_items,
    transfer_date: new Date(data.transfer_date).getTime(),
    transfer_description: data.transfer_description || "",
    custom_fields: data.custom_fields || [],
    folder_detail: data.folder_detail || {},
  };
  payload.custom_fields.push({
    name: "Order ID",
    value: data.orderId,
    type: "TEXT",
  });
  payload.custom_fields.push({
    name: "Ready for Shipment",
    value: data.readyForShipment,
    type: "CHECKBOX",
  });
  if (data.eta) {
    payload.custom_fields.push({
      name: "ETA",
      value: DateTime.fromJSDate(data.eta).toFormat("yyyy-MM-dd"),
      type: "DATE",
    });
  }
  if (data.pickupDate) {
    payload.custom_fields.push({
      name: "Pickup Date",
      value: DateTime.fromJSDate(data.pickupDate).toFormat("yyyy-MM-dd"),
      type: "DATE",
    });
  }
  let res;
  try {
    let headers = await this.signRequest("POST", "/stocktransfers/", payload);
    res = await this.http.post("/stocktransfers/", payload, { headers });
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new this.OrderhiveError(error.message, error.response?.data);
    } else throw new this.OrderhiveError(error);
  }
  this.logger.info(`Successfully created transfer ${res.data.id}`);
  return res.data;
}

module.exports = createTransfer;
