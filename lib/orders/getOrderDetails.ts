import Orderhive from "../index";

export default async function getOrderDetails(
  this: Orderhive,
  orderId: number
) {
  try {
    const path = `/orders/salesorder/${orderId}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
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
