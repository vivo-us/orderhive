import Orderhive from "../index";
import {
  CreateShipmentOptions,
  CreateShipmentResponse,
} from "../definitions/shipping";

/**
 * @param  {CreateShipmentOptions} options
 * @return {Promise<CreateShipmentResponse>}
 */

export default async function createShipment(
  this: Orderhive,
  options: CreateShipmentOptions
): Promise<CreateShipmentResponse> {
  try {
    const path = `/shipping/shipments/add`;
    const headers = await this.signRequest("POST", path, options);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, options, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error creating new shipment`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
