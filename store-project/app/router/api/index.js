const router = require("express").Router();
const homeController = require("../../controllers/api/home.controller");

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
 *    responses:
 *         200:
 *            description: success
 *         404:
 *            description: not found
 */

router.get("/", homeController.indexPage);

module.exports = {
  HomeRoutes: router,
};
