function allExceptionHandler(app) {
  app.use((err, req, res, next) => {
    let status = err?.status ?? err?.statusCode ?? err?.code;

    if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;

    console.log(err);

    return res.status(status).json({
      isError: true,
      message: err?.message ?? err ?? "Internal serverError",
    });
  });
}

module.exports = allExceptionHandler;
