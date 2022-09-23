import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import { Order } from "../definitions/orders";

/**
 * @param  {payload} object - Orderhive Order ID
 * @return {Promise<Order>}
 * @note This function is used to get multiple orders by filters, or query
 * @example await getOrders({
        "page": {
            "pageId": 0,
            "limit": 40
        },
        "filters": {
            "custom_status": [
                1
            ],
            "storesByIds": [
                83260
            ]
        },
        "query": "",
        "sortBy": {
            "property": "modified",
            "direction": "DESC"
        }
    })
 */

export default async function getOrders(
  this: Orderhive,
  payload: {}
): Promise<Order> {
  //await IdSchema.required().validateAsync(payload);
  try {
    const path = `/orders/salesorder/v1/`;
    const headers = await this.signRequest("POST", path, payload);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, payload, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting order details for payload ${payload}`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
