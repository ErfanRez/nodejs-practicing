function notFoundHandler(app) {
  app.all("*", (req, res, next) => {
    return res.status(404).json({
      message: "404 not found",
    });
  });
}

module.exports = notFoundHandler;
