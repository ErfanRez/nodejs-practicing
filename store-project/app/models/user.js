const { Types, Schema, model } = require("mongoose");

const schema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  otp: {
    type: Object,
    default: {
      code: 0,
      expires: o,
    },
  },
  bills: { type: [], default: [] },
  discount: { type: Number, default: 0 },
  birthday: { type: String },
  roles: { type: [String], default: ["USER"] },
});

module.exports = {
  UserModel: model("user", schema),
};
