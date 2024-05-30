const { Router } = require("express");
const userController = require("./user.controller");
const authorization = require("../../common/guard/authorization.guard");

const router = Router();

router.get("/profile", authorization, userController.getProfile);

module.exports = {
  UserRouter: router,
};
