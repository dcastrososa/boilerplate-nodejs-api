const express = require("express");
const sequelize = require("./database");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// Swagger
const swaggerDefinition = {
  info: {
    title: "Example API",
    version: "1.0.0",
    description: "Documentation"
  },
  host: "localhost:3000",
  basePath: "/"
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};
const swaggerSpec = swaggerJSDoc(options);
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require("./routes")(app);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("listening on 3000");
  });
});
