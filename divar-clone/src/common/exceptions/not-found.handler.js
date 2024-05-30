function notFoundHandler(app) {
  app.use((req, res, next) => {
    res.status(404).json({
      message: "404 not found",
    });
  });
}

module.exports = notFoundHandler;
