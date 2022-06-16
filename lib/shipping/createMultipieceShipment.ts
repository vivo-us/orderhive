import Orderhive from "../index";
import {
  CreateMultipieceShipmentOptions,
  CreateMultipieceShipmentSchema,
} from "../definitions/shipping";

/**
 * @param  {CreateMultipieceShipmentOptions} data - Data for creating a multipiece shipment
 * @return {Promise<string>}
 */

export default async function createMultipieceShipment(
  this: Orderhive,
  data: CreateMultipieceShipmentOptions
): Promise<string> {
  await CreateMultipieceShipmentSchema.required().validateAsync(data);
  try {
    const path = `/shipping/multipieceshipments/add`;
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error creating new multipiece shipment`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
