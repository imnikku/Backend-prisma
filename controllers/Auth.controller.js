import vine, { errors } from "@vinejs/vine";
import prisma from "../Db/db.config.js";
import { loginSchema, registerSchema } from "../validations/Auth.validation.js";
import {
  PasswordGenerate,
  ComparePassword,
  SignToken,
} from "../helpers/index.helper.js";
class AuthController {
  // register ..........
  static async register(req, res) {
    try {
      const data = req.body;
      const validator = vine.compile(registerSchema);
      const output = await validator.validate(data);

      //   check exist
      const isUser = await prisma.users.findUnique({
        where: { email: output.email },
      });
      if (isUser) {
        return res.status(400).json({
          messages: "Email already taken. Please  use another one.",
          data: null,
        });
      }

      output.password = await PasswordGenerate(output.password);
      const user = await prisma.users.create({
        data: output,
      });
      return res
        .status(200)
        .json({ data: user, message: "User created Successfully." });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ message: error.messages, data: null });
      }
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
      });
    }
  }

  // Login ....
  static async login(req, res) {
    try {
      const data = req.body;
      const validator = vine.compile(loginSchema);
      await validator.validate(data);
      const isUser = await prisma.users.findUnique({
        where: {
          email: data.email,
        },
      });
      if (isUser) {
        if (await ComparePassword(data.password, isUser.password)) {
          return res.status(200).json({
            data: isUser,
            message: "Login Successfully.",
            token: await SignToken(isUser),
          });
        }
      }
      return res.status(400).json({
        messages: "Invalid Credential. Please try again...",
        data: null,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ message: error.messages, data: null });
      }
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
      });
    }
  }
}

export default AuthController;
