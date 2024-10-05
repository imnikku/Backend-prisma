import { Router } from "express";
const router = Router();
import { NewsController } from "../controllers/index.controller.js";
import authMiddleware from "../middleware/Auth.middleware.js";

router.post("/", authMiddleware, NewsController.create);

export default router;
