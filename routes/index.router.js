import { Router } from "express";
import AuthRouter from "./Auth.router.js";
import ProfileRouter from "./Profile.router.js";
import NewsRouter from "./News.router.js";

const router = Router();
router.use("/auth", AuthRouter);
router.use("/profile", ProfileRouter);
router.use("/news", NewsRouter);

router.use("*", (req, res) => {
  return res.status(400).json({
    message: "Route not fount, please check (path and method)",
    data: null,
  });
});

export default router;
