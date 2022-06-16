import Orderhive from "../index";
import {
  CreateMultipieceShipmentOptions,
  CreateMultipieceShipmentSchema,
} from "../definitions/shipping";

/**
 * @param  {CreateMultipieceShipmentOptions} options
 * @return {Promise<string>}
 */

export default async function createMultipieceShipment(
  this: Orderhive,
  options: CreateMultipieceShipmentOptions
): Promise<string> {
  await CreateMultipieceShipmentSchema.validateAsync(options);
  try {
    const path = `/shipping/multipieceshipments/add`;
    const headers = await this.signRequest("POST", path, options);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, options, { headers });
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
