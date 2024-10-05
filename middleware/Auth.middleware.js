import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ message: "Unauthorized", data: null });
  }
  try {
    const token = authHeader?.split(" ")[1];
    const isVerify = jwt.verify(token, process.env.JWT_SECRET);
    if (!isVerify) {
      return res.status(400).json({ message: "Unauthorized", data: null });
    }
    req.user = isVerify;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized", data: null });
  }
};

export default authMiddleware;
