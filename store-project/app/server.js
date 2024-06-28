const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require("http-errors");

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
    this.#app.use(morgan("dev"));
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

    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to DB");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("mongoose disconnected!");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }

  createRoutes() {
    this.#app.use(AllRoutes);
  }

  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("URL not found!"));
    });

    this.#app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      const message = err.message || createError.InternalServerError;

      return res.status(statusCode).json({
        error: {
          statusCode,
          message,
        },
      });
    });
  }
}

module.exports = App;
