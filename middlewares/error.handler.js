const { ValidationError } = require('sequelize');

const logErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  next(err);
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { statusCode, payload } = err.output;

    res.status(statusCode).json(payload);
  }
  next(err);
};

const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors,
    });
  }
  next(err);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
};
