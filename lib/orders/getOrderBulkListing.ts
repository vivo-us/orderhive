import Orderhive from "../index";
import { IdSchema } from "../definitions/global";
import {OrderBulkListingFilters, OrderBulkListingFiltersSchema} from "../definitions/orders";
import { Order } from "../definitions/orders";

import { string } from "joi";

/**
 * @param  {number} orderId - Orderhive Order ID
 * @return {Promise<Order>}
 */

export default async function getOrderBulkListing(
  this: Orderhive,
  filterData: OrderBulkListingFilters,
  next_token: string = ''
): Promise<Order> {
    const allowedFilters = ['order_status', 'custom_status', 'storesByIds', 'from_date', 'to_date', 'from_modified_date', 'to_modified_date']


    let body: any = {
        'filters': {},
        'next_token': next_token.length>0 ? next_token : null,
    } 

    for(let item of Object.keys(filterData)) {
        if(!allowedFilters.includes(item)) continue
        body.filters[item] = filterData[item];
    }

    OrderBulkListingFiltersSchema.required().validateAsync(body.filters);

    //console.log(body);

  try {
    const path = `/orders/salesorder/bulk`;
    const headers = await this.signRequest("POST", path, body);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, body, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error getting bulk order listing`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
