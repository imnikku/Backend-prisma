import vine, { errors } from "@vinejs/vine";
import { newsSchema } from "../validations/index.validation.js";
import {
  FileUpload,
  generateUniqueImgeName,
  imageValidator,
  RemoveFile,
  UploadPath,
} from "../helpers/index.helper.js";
import prisma from "../Db/db.config.js";

class NewsController {
  // get all news ...........................................
  static async all(req, res) {
    try {
      let page = Math.abs(Number(req?.query?.page || 1));
      let limit = Math.abs(Number(req.query.limit || 10));
      let skip = ((page || 1) - 1) * limit;
      const news = await prisma.news.findMany({
        take: limit,
        skip: skip,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile: true,
            },
          },
        },
      });
      const countNews = await prisma.news.count({});
      return res.status(200).json({
        message: "News find successfully...",
        data: news,
        metadata: {
          pages: Math.ceil(countNews / limit),
          limit,
          page,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
      });
    }
  }

  // create news .............................................
  static async create(req, res) {
    try {
      const validator = vine.compile(newsSchema);
      const data = await validator.validate(req.body);

      //  image check .................
      if (
        !req.files ||
        Object.keys(req.files).length == 0 ||
        !req.files.image
      ) {
        return res.status(500).json({
          message: "Image is required.",
          data: null,
        });
      }
      const Image = req.files.image;
      if (Image instanceof Array) {
        return res.status(500).json({
          message: "Please provide only one image",
          data: null,
        });
      }

      //   check image type .......
      const invalidImage = imageValidator(Image.size, Image.mimetype);

      if (invalidImage) {
        return res.status(500).json({
          message: invalidImage,
          data: null,
        });
      }

      //   upload image ......
      const imageName = generateUniqueImgeName(Image.name);
      const uploadPath = UploadPath(imageName);
      await FileUpload(Image, uploadPath);
      data["image"] = imageName;
      data["user_id"] = req.user.id;
      console;
      const news = await prisma.news.create({ data });
      return res
        .status(200)
        .json({ message: "News created Successfully...", data: news });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ message: error.messages, data: null });
      }
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
      });
    }
  }

  // read one news ........................................................
  static async get(req, res) {
    try {
      const { id } = req.params;
      const news = await prisma.news.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: true,
        },
      });
      if (!news) {
        return res.status(400).json({
          message: "News not found",
          data: null,
        });
      }
      return res.status(200).json({
        message: "Find successfully...",
        data: news,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
      });
    }
  }

  // update news .........
  static async update(req, res) {
    try {
      const { id } = req.params;
      let news = await prisma.news.findUnique({ where: { id: Number(id) } });
      if (req.user.id != news.user_id) {
        return res.status(400).json({
          message: "Unauthorized for updating this news...",
          data: null,
        });
      }
      const validator = vine.compile(newsSchema);
      const data = await validator.validate(req.body);

      //  image check .................
      if (req.files?.image) {
        if (
          !req.files ||
          Object.keys(req.files).length == 0 ||
          !req.files.image
        ) {
          return res.status(500).json({
            message: "Image is required.",
            data: null,
          });
        }
        const Image = req.files.image;
        if (Image instanceof Array) {
          return res.status(500).json({
            message: "Please provide only one image",
            data: null,
          });
        }

        //   check image type .......
        const invalidImage = imageValidator(Image.size, Image.mimetype);

        if (invalidImage) {
          return res.status(500).json({
            message: invalidImage,
            data: null,
          });
        }

        // remove image
        await RemoveFile(news.image);
        //   upload image ......
        const imageName = generateUniqueImgeName(Image.name);
        const uploadPath = UploadPath(imageName);
        await FileUpload(Image, uploadPath);
        data["image"] = imageName;
      }
      data["user_id"] = req.user.id;

      news = await prisma.news.update({ data, where: { id: Number(id) } });
      return res
        .status(200)
        .json({ message: "News updated successfully...", data: news });
    } catch (error) {
      console.log(error);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ message: error.messages, data: null });
      }
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
      });
    }
  }

  // delete news .......
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const news = await prisma.news.findUnique({
        where: { id: Number(id), isDeleted: false },
      });
      if (req.user?.id != news?.user_id) {
        return res.status(400).json({
          message: "Unauthorized for delete this news...",
          data: null,
        });
      }
      await prisma.news.update({
        data: {
          deleted_at: new Date(),
          isDeleted: true,
        },
        where: {
          id: Number(id),
        },
      });

      return res
        .status(200)
        .json({ message: "News deleted successfully...", data: news });
    } catch (error) {
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
      });
    }
  }
}
export default NewsController;
