const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const categoryMessages = require("./category.messages");
const HttpCodes = require("http-codes");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }

  async find(req, res, next) {
    try {
      const categories = await this.#service.find();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, icon, slug, parent } = req.body;
      await this.#service.create({ name, icon, slug, parent });
      return res.status(HttpCodes.CREATED).json({
        message: categoryMessages.created,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      return res.json({
        message: categoryMessages.deleted,
      });
    } catch (error) {}
  }
}

module.exports = new CategoryController();
