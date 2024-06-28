const {
  UserAuthController,
} = require("../../controllers/user/auth/auth.controller");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *      name: User Auth
 *      description: user login
 *
 * /user/login:
 *    post:
 *        summary: login user in user panel with phone number
 *        tags: [User Auth]
 *        description: one time password(OTP) login
 *        parameters:
 *        -   name: mobile
 *            description: fa-IRI phone number
 *            in: formData
 *            required: true
 *            type: string
 *        responses:
 *                201:
 *                    description: logged In
 *                400:
 *                    description:  Bad Request
 *                403:
 *                    description: Unauthorized
 *                500:
 *                    description: Internal Server Error
 */

router.post("/login", UserAuthController.login);

module.exports = {
  UserAuthRoutes: router,
};
