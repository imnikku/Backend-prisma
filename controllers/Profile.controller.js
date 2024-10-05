class ProfileController {
  static async getProfile(req, res) {
    try {
      const user = req.user;
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
}
export default ProfileController;
