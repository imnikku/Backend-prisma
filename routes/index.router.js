import { Router } from "express";
import AuthRouter from "./Auth.router.js";
import ProfileRouter from "./Profile.router.js";

const router = Router();
router.use("/auth", AuthRouter);
router.use("/profile", ProfileRouter);

export default router;
