const { Schema, model, Types } = require("mongoose");

const OptionSchema = Schema({
  title: { type: String, required: true },
  key: { type: String, required: true },
  type: { type: String, enum: ["number", "string", "array", "boolean"] },
  enum: { type: Array, default: [] },
  guide: { type: String, required: false },
  category: { type: Types.ObjectId, ref: "Category", required: true },
});

const OptionModel = model("option", OptionSchema);

module.exports = OptionModel;
