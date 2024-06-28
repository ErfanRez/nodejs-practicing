const createHttpError = require("http-errors");
const { authSchema } = require("../../../http/validators/user/auth.schema");

class UserAuthController {
  async login(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      return res.status(200).json("Logged in successfully");
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
