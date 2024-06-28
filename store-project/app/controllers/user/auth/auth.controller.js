const createHttpError = require("http-errors");
const { authSchema } = require("../../../http/validators/user/auth.schema");
const { randomOtpGenerator } = require("../../../utils/functions");
const { UserModel } = require("../../../models/user");
const { EXPIRES_IN, USER_ROLE } = require("../../../utils/constants");
const Controller = require("../../controller");

class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = randomOtpGenerator();
      const result = await this.saveUSer(mobile, code);
      if (!result) throw createHttpError.Unauthorized("Unauthorized!");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "otp was sent to you",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }

  async saveUSer(mobile, code) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN,
    };

    const result = await this.checkExistUSer(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }

    return !!(await UserModel.create({
      mobile,
      otp,
      roles: [USER_ROLE],
    }));
  }

  async checkExistUSer(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", "", 0, null, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );

    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
