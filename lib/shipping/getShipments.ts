import Orderhive from "../index";
import { Shipment } from "./definitions";

export default async function getShipments(
  this: Orderhive,
  orderId: number
): Promise<Shipment> {
  try {
    const path = `/orders/salesorder/${orderId}?childShipment=true`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting order shipments`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
