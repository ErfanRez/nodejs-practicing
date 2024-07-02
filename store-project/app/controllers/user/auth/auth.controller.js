const createHttpError = require("http-errors");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../http/validators/user/auth.schema");
const {
  randomOtpGenerator,
  signAccessToken,
  verifyRefreshToken,
  signRefreshToken,
} = require("../../../utils/functions");
const { UserModel } = require("../../../models/user");
const { EXPIRES_IN, USER_ROLE } = require("../../../utils/constants");
const Controller = require("../../controller");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
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

  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createHttpError.NotFound("User not found!");
      if (user.otp.code != code)
        throw createHttpError.Unauthorized("OTP code not correct!");
      const now = Date.now();
      if (user.otp.expiresIn < now)
        throw createHttpError.Unauthorized("OTP code expired!");

      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);

      return res.json({
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await verifyRefreshToken(refreshToken);
      const user = await UserModel.findOne({ mobile });
      const accessToken = await signAccessToken(user._id);
      const newRefreshToken = await signRefreshToken(user._id);
      return res.json({
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      next(error);
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
