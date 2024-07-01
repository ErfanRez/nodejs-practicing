const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models/user");
const { ACCESS_TOKEN_SECRET } = require("../../utils/constants");

function verifyAccessToken(req, res, next) {
  const headers = req.headers;
  const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
  if (token && bearer.toLowerCase() === "bearer") {
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err)
        return next(
          createHttpError.Unauthorized("Please login to your account")
        );

      const { mobile } = decoded || {};
      const user = await UserModel.findOne(
        { mobile },
        { password: 0, otp: 0, _v: 0 }
      );

      if (!user)
        return next(createHttpError.Unauthorized("User account not found!"));
      req.user = user;
      return next();
    });
  } else
    return next(createHttpError.Unauthorized("Please login to your account"));
}

module.exports = {
  verifyAccessToken,
};
