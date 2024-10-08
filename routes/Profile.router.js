import { Router } from "express";
import authMiddleware from "../middleware/Auth.middleware.js";
import { ProfileController } from "../controllers/index.controller.js";
const router = Router();
router.get("/", authMiddleware, ProfileController.getProfile);
router.put("/", authMiddleware, ProfileController.updateProfile);

export default router;
