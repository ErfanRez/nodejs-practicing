require("dotenv").config();
const express = require("express");
const swaggerConfig = require("./src/config/swagger.config");

async function main() {
  const app = express();
  const PORT = process.env.PORT;
  require("./src/config/mongoose.config");
  swaggerConfig(app);

  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}

main();
