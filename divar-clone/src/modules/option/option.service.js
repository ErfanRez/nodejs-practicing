const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const createHttpError = require("http-errors");
const OptionMessages = require("./option.messages");
const { default: slugify } = require("slugify");
const categoryService = require("../category/category.service");
const { isTrue, isFalse } = require("../../common/utils/functions");

class OptionService {
  #model;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryService = categoryService;
  }

  async checkExistById(id) {
    const option = await this.#model.findById(id);
    if (!option) throw new createHttpError.NotFound(OptionMessages.notFount);
    return option;
  }

  async alreadyExistByCategoryAndKey(key, category, exceptionId = null) {
    const isExist = await this.#model.findOne({
      category,
      key,
      _id: { $ne: exceptionId },
    });
    if (isExist)
      throw new createHttpError.Conflict(OptionMessages.alreadyExist);
    return;
  }

  async findAll() {
    const options = await this.#model
      .find({}, { __v: 0 }, { sort: { _id: -1 } })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
  }

  async findById(id) {
    return await this.checkExistById(id);
  }

  async findByCatId(category) {
    return await this.#model
      .find({ category }, { __v: 0 })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
  }

  async findByCatSlug(slug) {
    const options = await this.#model.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $addFields: {
          categoryName: "$category.name",
          categorySlug: "$category.slug",
          categoryIcon: "$category.icon",
        },
      },
      {
        $project: {
          category: 0,
          __v: 0,
        },
      },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);

    return options;
  }

  async create(optionDto) {
    const category = await this.#categoryService.checkExistById(
      optionDto.category
    );
    optionDto.category = category._id;
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });
    await this.alreadyExistByCategoryAndKey(optionDto.key, category._id);
    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (!Array.isArray(optionDto.enum)) optionDto.enum = [];

    if (isTrue(optionDto?.required)) optionDto.required = true;
    if (isFalse(optionDto?.required)) optionDto.required = false;

    const option = await this.#model.create(optionDto);
    return option;
  }

  async removeById(id) {
    await this.checkExistById(id);
    return await this.#model.deleteOne({ _id: id });
  }
}
module.exports = new OptionService();
