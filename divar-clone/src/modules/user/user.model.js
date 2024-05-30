const { Schema, model } = require("mongoose");

const OTPSchema = new Schema({
  code: { type: String, required: false, default: null },
  expiresIn: { type: Number, required: false, default: 0 },
});

const userSchema = new Schema(
  {
    fullName: { type: String, required: false },
    mobile: { type: String, unique: true, required: true },
    otp: { type: OTPSchema },
    verifiedMobile: { type: Boolean, required: true, default: false },
    accessToken: { type: String },
  },
  { timestamps: true }
);

const UserModel = model("user", userSchema);

module.exports = UserModel;
