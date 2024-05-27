require("dotenv").config();
const express = require("express");
async function main() {
  const app = express();
  const PORT = process.env.PORT;
  require("./src/config/mongoose.config");

  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}

main();
