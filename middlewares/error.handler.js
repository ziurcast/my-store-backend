const logErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  next(err);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { statusCode, payload } = err.output;

    res.status(statusCode).json(payload);
  }
  next(err);
};

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
};
