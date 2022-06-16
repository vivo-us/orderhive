import Orderhive from "../index";
import {
  CreateShipmentOptions,
  CreateShipmentResponse,
  CreateShipmentSchema,
} from "../definitions/shipping";

/**
 * @param  {CreateShipmentOptions} data - Data for creating a shipment
 * @return {Promise<CreateShipmentResponse>}
 */

export default async function createShipment(
  this: Orderhive,
  data: CreateShipmentOptions
): Promise<CreateShipmentResponse> {
  await CreateShipmentSchema.required().validateAsync(data);
  try {
    const path = `/shipping/shipments/add`;
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
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
