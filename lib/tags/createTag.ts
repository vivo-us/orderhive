import Orderhive from "../index";
import { NewTag, TagData } from "../definitions/tags";

/** *
 * @param  {TagData} tagData - Data for creating a tag
 * @return {Promise<NewTag>}
 */

export default async function createTag(
  this: Orderhive,
  tagData: TagData
): Promise<NewTag> {
  await TagData.required().validateAsync(tagData);
  try {
    let path = "/orders/tags";
    tagData;
    const headers = await this.signRequest("POST", path, tagData);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, tagData, { headers });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.data?.errors.includes("Tag already exists.")) {
        throw new this.OrderhiveError(
          "Tag already exists",
          error.response.data
        );
      } else {
        throw new this.OrderhiveError(
          "Error creating tag",
          error.response.data
        );
      }
    }
    this.logger.error(error.message);
    throw new this.OrderhiveError(error.message, error);
  }
}
