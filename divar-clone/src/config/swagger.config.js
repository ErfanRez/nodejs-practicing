const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function swaggerConfig(app) {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: "divar-backend",
        description: "divar website backend using ExpressJs",
        version: "1.0.0",
      },
    },
    apis: [],
  });

  const swagger = swaggerUi.setup(swaggerDocument, {});

  app.use("/", swaggerUi.serve, swagger);
}

module.exports = swaggerConfig;
