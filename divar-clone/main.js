require("dotenv").config();
const express = require("express");
const swaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const notFoundHandler = require("./src/common/exceptions/not-found.handler");
const allExceptionHandler = require("./src/common/exceptions/all-exception.handler");
const cookieParser = require("cookie-parser");
const expressEjsLayouts = require("express-ejs-layouts");

async function main() {
  const app = express();
  const PORT = process.env.PORT;
  require("./src/config/mongoose.config");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  app.use(express.static("public"));
  app.use(expressEjsLayouts);
  app.set("view engine", "ejs");
  app.set("layout", "./layouts/panel/main.ejs");

  app.use(mainRouter);
  swaggerConfig(app);

  notFoundHandler(app);
  allExceptionHandler(app);
  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}

main();
