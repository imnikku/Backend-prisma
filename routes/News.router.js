import { Router } from "express";
const router = Router();
import { NewsController } from "../controllers/index.controller.js";
import authMiddleware from "../middleware/Auth.middleware.js";

router.get("/", NewsController.all);
router.get("/:id", NewsController.get);

router.post("/", authMiddleware, NewsController.create);
router.put("/:id", authMiddleware, NewsController.update);
router.delete("/:id", authMiddleware, NewsController.delete);

export default router;
