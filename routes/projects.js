const { ProjectsController } = require("./../controllers");
const { checkTokenAuth } = require("./../middleware");

/**
 * @swagger
 * definitions:
 *  Project:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      title:
 *        type: string
 *      description:
 *        type: string
 */

module.exports = app => {
  /**
   * @swagger
   * /projects:
   *  post:
   *    tags:
   *      - Projects
   *    name: Save project
   *    summary: Save project
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: header
   *        name: x-access-token
   *        schema: 
   *          type: string
   *        required: true
   *      - in: body
   *        name: body
   *        schema:
   *          type: object
   *          properties:
   *            title:
   *              type: string
   *            description:
   *              type: string
   *          required:
   *            - title
   *            - description
   *    responses:
   *      201:
   *        description: Project saved
   *      500:
   *        description: Internal server error
   */
  app.post("/projects", checkTokenAuth, ProjectsController.create);

  /**
   * @swagger
   * /projects:
   *  get:
   *    tags:
   *      - Projects
   *    name: All Projects
   *    summary: All Projects.
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *    responses:
   *      200:
   *        description: Projects
   *      500:
   *        description: Internal server error
   */
  app.get("/projects", checkTokenAuth, ProjectsController.index);
};
