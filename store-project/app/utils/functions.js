const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("./constants");

function randomOtpGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}

function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
      userId: user._id,
    };
    const options = {
      expiresIn: "1h",
    };
    jwt.sign(payload, ACCESS_TOKEN_SECRET, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError());
      resolve(token);
    });
  });
}

function signRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1y",
    };
    jwt.sign(payload, REFRESH_TOKEN_SECRET, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError());
      resolve(token);
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err)
        reject(createHttpError.Unauthorized("Please login to your account"));

      const { mobile } = decoded || {};
      const user = await UserModel.findOne(
        { mobile },
        { password: 0, otp: 0, _v: 0 }
      );

      if (!user)
        reject(createHttpError.Unauthorized("User account not found!"));

      resolve(mobile);
    });
  });
}

module.exports = {
  randomOtpGenerator,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
