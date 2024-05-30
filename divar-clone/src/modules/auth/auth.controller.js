const cookieNames = require("../../common/constants/cookie.enum");
const nodeEnv = require("../../common/constants/env.enum");
const AuthMessage = require("./auth.messages");
const authService = require("./auth.service");
const autoBind = require("auto-bind");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMessage.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const token = await this.#service.checkOTP(mobile, code);
      return res
        .cookie(cookieNames.AccessToken, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === nodeEnv.Production,
        })
        .status(200)
        .json({
          message: AuthMessage.loginSuccessfully,
        });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      return res
        .clearCookie(cookieNames.AccessToken)
        .status(200)
        .json({ message: AuthMessage.logout });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
