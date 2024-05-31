const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router();

router.get("/", categoryController.find);
router.post("/", categoryController.create);

module.exports = {
  CategoryRouter: router,
};
