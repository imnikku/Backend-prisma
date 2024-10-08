import fs from "fs";
export async function FileUpload(file, path) {
  try {
    return await file.mv(path);
  } catch (error) {
    throw new Error("Something Went Wrong");
  }
}

export async function RemoveFile(imageName) {
  const path = `${process.cwd()}/public/images/${imageName}`;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}
