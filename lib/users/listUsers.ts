import Orderhive from "../index";
import { ListUsersResponse } from "../definitions/users";

/**
 * @param {number} [size]
 * @return {Promise<ListUsersResponse>}
 */

export default async function listCustomFields(
  this: Orderhive,
  size?: number
): Promise<ListUsersResponse> {
  try {
    const path = `/setup/user?size=${size || 300}`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        "Error getting custom fields list",
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
