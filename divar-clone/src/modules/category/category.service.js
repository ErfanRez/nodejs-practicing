const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const categoryMessages = require("./category.messages");
const slugify = require("slugify");
const OptionModel = require("../option/option.model");

class CategoryService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
    this.#optionModel = OptionModel;
  }

  async checkExistById(id) {
    if (!isValidObjectId(id)) throw new createHttpError[400]("Invalid ID!");
    const category = await this.#model.findById(id);
    if (!category)
      throw new createHttpError.NotFound(categoryMessages.notFount);

    return category;
  }

  async checkExistBySlug(slug) {
    const category = this.#model.findOne({ slug });
    if (!category)
      throw new createHttpError.NotFound(categoryMessages.notFount);

    return category;
  }

  async duplicateSlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.Conflict(categoryMessages.alreadyExist);

    return;
  }

  async find() {
    return await this.#model.find({ parent: { $exists: false } }).lean();
  }

  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistById(categoryDto.parent);
      categoryDto.parents = [
        ...new Set(
          [existCategory._id.toString()]
            .concat(existCategory.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id))
        ),
      ];
    }
    if (categoryDto?.slug) {
      categoryDto.slug = slugify(categoryDto.slug);
      await this.duplicateSlug(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.name);
    }
    const category = await this.#model.create(categoryDto);
    return category;
  }

  async remove(id) {
    await this.checkExistById(id);
    await this.#optionModel.deleteMany({ category: id }).then(async () => {
      await this.#model.deleteMany({ __id: id });
    });

    return;
  }
}

module.exports = new CategoryService();
