const router = require("express").Router();
const homeController = require("../../controllers/api/home.controller");

router.get("/", homeController.indexPage);

module.exports = {
  HomeRoutes: router,
};
