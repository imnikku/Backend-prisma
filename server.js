import express from "express";
import "dotenv/config";
import fileupload from "express-fileupload";
import AllRoute from "./routes/index.router.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middleware ......
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
