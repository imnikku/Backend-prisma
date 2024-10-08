import prisma from "../Db/db.config.js";
import {
  imageValidator,
  UploadPath,
  generateUniqueImgeName,
  FileUpload,
} from "../helpers/index.helper.js";

class ProfileController {
  // get profile ....
  static async getProfile(req, res) {
    try {
      let user = req.user;
      user = await prisma.users.findUnique({ where: { id: user.id } });

      return res
        .status(200)
        .json({ message: "Find successfully...", data: user });
    } catch (error) {
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
      });
    }
  }

  //   update profile .........
  static async updateProfile(req, res) {
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
      const profileImage = req.files.profile;

      if (profileImage instanceof Array) {
        return res.status(500).json({
          message: "Please provide only one image",
          data: null,
        });
      }

      console.log(profileImage instanceof Array);
      const invalidImage = imageValidator(
        profileImage.size,
        profileImage.mimetype
      );
      if (invalidImage) {
        return res.status(500).json({
          message: invalidImage,
          data: null,
        });
      }

      //   upload image .............
      const imageName = generateUniqueImgeName(profileImage.name);
      const uploadPath = UploadPath(imageName);
      await FileUpload(profileImage, uploadPath);
      let user = await prisma.users.update({
        data: { profile: imageName },
        where: { id: Number(req.user.id) },
      });
      return res.status(200).json({
        message: "uploaded successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
        error: error,
      });
    }
  }
}
export default ProfileController;
