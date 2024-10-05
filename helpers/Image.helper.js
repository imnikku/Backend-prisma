import { supportedMimeType } from "../config/fileStytem.js";
import { GenerateUniqueNumber } from "./index.helper.js";

export const imageValidator = (size, mime) => {
  if (bytesToMb(size) > 2) {
    return "Image size must be less than 2MB ";
  } else if (!supportedMimeType?.includes(mime)) {
    return `Image must be type of ${supportedMimeType
      ?.map((item) => item?.split("/")[1])
      ?.join(",")}`;
  }

  return null;
};

export const bytesToMb = (bytes) => {
  return bytes / (1024 * 1024);
};

export const generateUniqueImgeName = (name) => {
  return `${GenerateUniqueNumber()}.${name?.split(".")[1]}`;
};
