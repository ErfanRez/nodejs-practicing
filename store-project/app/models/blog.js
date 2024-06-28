const { Types, Schema, model } = require("mongoose");

const schema = new Schema({
  author: { type: Types.ObjectId, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  tag: { type: String, default: [] },
  category: { type: Types.ObjectId, required: true },
  comments: { types: [], default: [] },
  like: { type: [Types.ObjectId], default: [] },
  dislike: { type: [Types.ObjectId], default: [] },
  bookmark: { type: [Types.ObjectId], default: [] },
});

module.exports = {
  BlogModel: model("blog", schema),
};
