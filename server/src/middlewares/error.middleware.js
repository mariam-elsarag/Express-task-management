// constants
import errorMessages from "../constants/errorMessages.js";

// utils
import AppError from "../utils/appErrors.js";

// JWT Errors
const handleJWTError = () => new AppError(errorMessages.jwt.invalid_token, 401);
const handleExpireJWTError = () =>
  new AppError(errorMessages.jwt.expired_token, 401);

const handleInvalidId = () => new AppError("Invalid ID", 400);

// Database Errors (Duplicate Data)
const handleDublicateDbData = (err) => {
  if (err.code === 11000) {
    let field = err.keyPattern.title
      ? "title"
      : err.keyPattern.email
      ? "email"
      : "";
    return new AppError(
      `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      400
    );
  }
  return new AppError(err.message, 400);
};

// Validation Errors
const handleValidationError = (err) => {
  let errors = [];
  if (err.errors) {
    Object.keys(err.errors).forEach((key) => {
      errors.push({ [key]: err.errors[key].properties.message });
    });
  }
  return errors.length > 0 ? new AppError(errors, 400) : null;
};

// Production Errors
const handleProducationErrors = (err, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ errors: err.message });
};

// Development Errors
const handleDevErrors = (err, res) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    errors: err.errors,
  });
};

// Global Error Handler
const globalErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  let error = { ...err };

  if (process.env.NODE_ENV === "production") {
    if (err.code === 11000) error = handleDublicateDbData(err);
    if (
      error?.name === "JsonWebTokenError" ||
      error?.message === "invalid signature"
    )
      error = handleJWTError();

    if (
      error?.errors?.email?.name === "ValidatorError" ||
      error?.errors?.password?.path === "password"
    ) {
      error = handleValidationError(error) || error;
    }
    if (error.name === "TokenExpiredError") error = handleExpireJWTError();

    handleProducationErrors(error, res);
  } else {
    handleDevErrors(err, res);
  }

  next();
};

export default globalErrors;
