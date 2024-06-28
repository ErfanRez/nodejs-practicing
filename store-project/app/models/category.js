const { default: mongoose, Types, Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
});

module.exports = {
  CategoryModel: model("category", schema),
};
