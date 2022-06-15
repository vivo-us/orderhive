import Orderhive from "../index";
import { NewTag, TagOptions } from "../definitions/tags";

/** *
 * @param  {TagOptions} tagOptions
 * @return {Promise<NewTag>}
 */

export default async function createTag(
  this: Orderhive,
  tagOptions: TagOptions
): Promise<NewTag> {
  if (
    tagOptions.tag_color &&
    (tagOptions.tag_color.length !== 7 ||
      tagOptions.tag_color.charAt(0) !== "#")
  ) {
    throw new Error(
      "Color must be a valid 7 characters long hex code including the starting #"
    );
  }
  try {
    let path = "/orders/tags";
    const headers = await this.signRequest("POST", path, tagOptions);
    if (!headers) throw new Error("Could not sign request");
    const res = await this.http.post(path, tagOptions, { headers });
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
