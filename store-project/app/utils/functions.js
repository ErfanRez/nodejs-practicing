const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { SECRET_KEY } = require("./constants");

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
    jwt.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err) reject(createHttpError.InternalServerError());
      resolve(token);
    });
  });
}

module.exports = {
  randomOtpGenerator,
  signAccessToken,
};
