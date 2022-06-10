import Orderhive from "../index";

export default async function listCustomOrderStatuses(
  this: Orderhive,
  orderId: number,
  packageIds: Array<number>
) {
  try {
    const path = `/orders/salesorder/serial_number/${orderId}`;
    let obj = { package_id: packageIds };
    const headers = await this.signRequest("POST", path, obj);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, obj, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error getting order details",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
