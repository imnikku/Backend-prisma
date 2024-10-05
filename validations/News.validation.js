import vine from "@vinejs/vine";
import { CustomeErrorReporter } from "./index.validation.js";

vine.errorReporter = () => new CustomeErrorReporter();
export const newsSchema = vine.object({
  title: vine.string().trim().minLength(5).maxLength(99),
  content: vine.string().trim().minLength(10).maxLength(40000),
});
