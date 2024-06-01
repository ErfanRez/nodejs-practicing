const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();

router.get("/", optionController.findAll);
router.get("/:id", optionController.findById);
router.get("/by-category/:catId", optionController.findByCatId);
router.get("/by-category-slug/:slug", optionController.findByCatSlug);
router.post("/", optionController.create);

module.exports = {
  OptionRouter: router,
};
