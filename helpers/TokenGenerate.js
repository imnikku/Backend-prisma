import jwt from "jsonwebtoken";
export const SignToken = async (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};
