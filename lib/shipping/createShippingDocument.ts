import {
  CreateShippingDocumentData,
  CreateShippingDocumentResponse,
  CreateShipmentDocumentDataScehma,
} from "./../definitions/shipping";
import { IdSchema } from "./../definitions/global";
import Orderhive from "../index";

/**
 * @param {number} formId - Form Id returned from Orderhive
 * @param  {CreateShippingDocumentData} data - Data for creating the document
 * @return {Promise<CreateShippingDocumentResponse>}
 */

export default async function createShipmentDocuments(
  this: Orderhive,
  formId: number,
  data: CreateShippingDocumentData
): Promise<CreateShippingDocumentResponse> {
  await CreateShipmentDocumentDataScehma.required().validateAsync(data);
  await IdSchema.required().validateAsync(formId);
  try {
    const path = `/shipping/form/print/${formId}`;
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
