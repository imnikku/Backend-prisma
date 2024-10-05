class NewsController {
  static async create(req, res) {
    try {
      const user = req.user;
    } catch (error) {
      return res.status(500).json({
        message: "Something wend wrong",
        data: null,
      });
    }
  }
}
export default NewsController;
