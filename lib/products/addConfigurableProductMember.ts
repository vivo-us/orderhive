import Orderhive from "../index";
import { Product, CreateConfigurableProductMember } from "./definitions";

interface AddConfigurableProductMemberData {
  members: Array<CreateConfigurableProductMember>;
}

export default async function addConfigurableProductMember(
  this: Orderhive,
  productId: number,
  data: AddConfigurableProductMemberData
): Promise<Product> {
  for (let member of data.members) {
    let hasOption = false;
    for (let each in member) {
      if (!each.includes("option")) continue;
      hasOption = true;
      break;
    }
    if (!hasOption) {
      throw new Error(
        "Configurable product members must have at least one option specified"
      );
    }
  }
  try {
    const path = `/product/configurable/${productId}/variants`;
    const headers = await this.signRequest("POST", path, data);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, data, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new this.OrderhiveError(
        `Error adding product to configurable product`,
        error.response.data
      );
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
