const autoBind = require("auto-bind");
const optionService = require("./option.service");
const optionMessages = require("./option.messages");
const HttpCodes = require("http-codes");

class OptionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = optionService;
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const option = await this.#service.findById(id);
      return res.json(option);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const options = await this.#service.findAll();
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }

  async findByCatId(req, res, next) {
    try {
      const { catId } = req.params;
      const options = await this.#service.findByCatId(catId);
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }

  async findByCatSlug(req, res, next) {
    try {
      const { slug } = req.params;
      const options = await this.#service.findByCatSlug(slug);
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const {
        title,
        key,
        guide,
        enum: list,
        type,
        category,
        required,
      } = req.body;
      await this.#service.create({
        title,
        key,
        guide,
        enum: list,
        type,
        category,
        required,
      });

      return res.status(HttpCodes.CREATED).json({
        message: optionMessages.created,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const {
        title,
        key,
        guide,
        enum: list,
        type,
        category,
        required,
      } = req.body;
      const { id } = req.params;
      await this.#service.update(id, {
        title,
        key,
        guide,
        enum: list,
        type,
        category,
        required,
      });

      return res.json({
        message: optionMessages.updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeById(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.removeById(id);
      return res.json({
        message: optionMessages.deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionController();
