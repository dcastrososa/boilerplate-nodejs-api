const { Project } = require("../models");
const { getUserFromToken } = require("./../utils");

class ProjectsController {
  static async index(req, res) {
    try {
      const response = await Project.findAll();
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async create(req, res) {
    const { title, description } = req.body;

    try {
      const userLoggued = await getUserFromToken(req.headers["x-access-token"]);

      const response = await Project.create({
        title,
        description,
        creator_id: userLoggued.id
      });

      res.status(201).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ProjectsController;
