import Orderhive from "../index";
import { Store } from "./index";

interface ListStoresReturn {
  count: number;
  stores: Array<Store>;
}

export default async function listStores(
  this: Orderhive
): Promise<ListStoresReturn> {
  try {
    const path = `/setup/store`;
    const headers = await this.signRequest("GET", path);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.get(path, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error fetching stores`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
