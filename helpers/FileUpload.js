async function FileUpload(file, path) {
  try {
    return await file.mv(path);
  } catch (error) {
    throw new Error("Something Went Wrong");
  }
}

export default FileUpload;
