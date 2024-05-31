const { Schema, Types, model } = require("mongoose");

const PostSchema = Schema({
  title: { type: String, required: true },
  content: { type: String, require: true },
  category: { type: Types.ObjectId, ref: "category", required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  coordinate: { type: [Number], required: true },
  images: { type: [String], required: false, default: [] },
});

const PostModel = model("post", PostSchema);

module.exports = PostModel;
