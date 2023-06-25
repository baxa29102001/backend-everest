const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("./src/routes/main");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Description for my API",
    },
  },
  apis: ["./src/routes/routesDocs.yaml"], // replace with the path to your routes
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
};
