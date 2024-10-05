import { Router } from "express";
import { AuthController } from "../controllers/index.controller.js";
const router = Router();
router.post("/register", AuthController.register);
router.all("/login", AuthController.login);

export default router;
