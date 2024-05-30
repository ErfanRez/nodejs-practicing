/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category modules and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          createCategory:
 *              type:  object
 *              required:
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent:
 *                      type: string
 */

/**
 * @swagger
 *
 * /category:
 *  post:
 *      summary: Create new category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                      schema:
 *                        $ref: "#/components/schemas/createCategory"
 *      responses:
 *          200:
 *               description: success
 */

/**
 * @swagger
 *
 * /category:
 *  get:
 *      summary: Get all category
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *               description: success
 */
