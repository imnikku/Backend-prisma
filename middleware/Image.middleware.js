const ImageMiddleware = (value) => {
  return (req, res, next) => {
    try {
      if (
        !req.files ||
        Object.keys(req.files).length == 0 ||
        !req.files.profile
      ) {
        return res.status(500).json({
          message: "Profile image is required.",
          data: null,
        });
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid Image", data: null });
    }
  };
};

export default ImageMiddleware;
