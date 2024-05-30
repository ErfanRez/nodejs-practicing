require("dotenv").config();
const express = require("express");
const swaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");

async function main() {
  const app = express();
  const PORT = process.env.PORT;
  require("./src/config/mongoose.config");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  swaggerConfig(app);
  app.use(mainRouter);

  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}

main();
