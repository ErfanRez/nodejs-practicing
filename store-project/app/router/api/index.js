const router = require("express").Router();
const homeController = require("../../controllers/api/home.controller");
const {
  verifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");

/**
 * @swagger
 * tags:
 *    name: Index Page
 *    description: Index page route and data
 * /:
 *   get:
 *    summary: index of routes
 *    tags: [Index Page]
 *    description: get all needed data for index page
 *    parameters:
 *        -   in: header
 *            name: access-token
 *            example: Bearer YourToken...
 *    responses:
 *         200:
 *            description: success
 *         404:
 *            description: not found
 */

router.get("/", verifyAccessToken, homeController.indexPage);

module.exports = {
  HomeRoutes: router,
};
