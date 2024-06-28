const { default: mongoose, Types, Schema, model } = require("mongoose");

const schema = new Schema({
  author: { type: Types.ObjectId },
});

module.exports = {
  PaymentModel: model("payment", schema),
};
