module.exports = app => {
  require("./users")(app);
  require("./projects")(app);
};
