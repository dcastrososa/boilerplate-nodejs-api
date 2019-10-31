const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Project = sequelize.define("projects", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  creator_id: {
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  }
});

module.exports = Project;
