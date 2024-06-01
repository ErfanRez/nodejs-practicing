const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router();

router.get("/", categoryController.find);
router.post("/", categoryController.create);
router.delete("/:id", categoryController.remove);

module.exports = {
  CategoryRouter: router,
};
