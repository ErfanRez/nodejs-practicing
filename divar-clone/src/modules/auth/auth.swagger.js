/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth modules and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          sendOTP:
 *              type:  object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *          checkOTP:
 *              type:  object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                  code:
 *                      type: string
 */

/**
 * @swagger
 *
 * /auth/send-otp:
 *  post:
 *      summary: login with one time password
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/sendOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/sendOTP"
 *      responses:
 *          200:
 *               description: success
 */

/**
 * @swagger
 *
 * /auth/check-otp:
 *  post:
 *      summary: check otp to login user
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/checkOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/checkOTP"
 *      responses:
 *          200:
 *               description: success
 */
