import express from "express";
import "dotenv/config";
import fileupload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";
import AllRoute from "./routes/index.router.js";
import { limiter } from "./config/rateLimit.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middleware ......
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileupload());
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server running..." });
});

app.use("/api", AllRoute);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
