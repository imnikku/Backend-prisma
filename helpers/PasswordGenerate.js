import bcrypt from "bcryptjs";
export const PasswordGenerate = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const ComparePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};
