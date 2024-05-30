const createHttpError = require("http-errors");
const authorizationMessage = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const UserModel = require("../../modules/user/user.model");
require("dotenv").config();

const authorization = async (req, res, next) => {
  try {
    const token = req?.cookie?.access_token;
    if (!token)
      throw new createHttpError.Unauthorized(authorizationMessage.Login);

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (typeof data === Object && "id" in data) {
      const user = await UserModel.findById(data.id, {
        accessToken: 0,
        otp: 0,
      }).lean();

      if (!user)
        throw new createHttpError.Unauthorized(
          authorizationMessage.AccountNotFound
        );

      req.user = user;
      return next();
    }

    throw new createHttpError.Unauthorized(authorizationMessage.InvalidToken);
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
