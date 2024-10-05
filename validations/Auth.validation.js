import vine from "@vinejs/vine";
import { CustomeErrorReporter } from "./index.validation.js";

vine.errorReporter = () => new CustomeErrorReporter();
export const registerSchema = vine.object({
  name: vine.string().trim().minLength(2).maxLength(30),
  email: vine.string().trim().email(),
  password: vine.string().trim().minLength(6).confirmed(),
});

export const loginSchema = vine.object({
  email: vine.string().trim().email(),
  password: vine.string().trim(),
});
