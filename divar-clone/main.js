require("dotenv").config();
const express = require("express");
const swaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const notFoundHandler = require("./src/common/exceptions/not-found.handler");
const allExceptionHandler = require("./src/common/exceptions/all-exception.handler");

async function main() {
  const app = express();
  const PORT = process.env.PORT;
  require("./src/config/mongoose.config");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(mainRouter);
  swaggerConfig(app);

  notFoundHandler(app);
  allExceptionHandler(app);
  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}

main();
