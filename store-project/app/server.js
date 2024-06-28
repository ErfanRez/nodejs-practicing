const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

class App {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApp();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }

  configApp() {
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }

  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("Server running on http://localhost:" + this.#PORT);
    });
  }

  connectToMongoDB() {
    mongoose.connect(this.#DB_URI);
  }

  createRoutes() {}

  errorHandling() {
    this.#app.use((req, res, next) => {
      return res.json({
        statusCode: 404,
        message: "Page not found!",
      });
    });

    this.#app.use((error, req, res, next) => {
      const statusCode = err.status || 500;
      const message = err.message || "Internal Server Error";

      return res.status(statusCode).json({ statusCode, message });
    });
  }
}

module.exports = App;
