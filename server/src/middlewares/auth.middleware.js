import jwt from "jsonwebtoken";

// model
import User from "../api/user/user.model.js";
// utils
import logger from "../utils/logger.js";
import AppErrors from "../utils/appErrors.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// constant
import errorMessages from "../constants/errorMessages.js";

// to extract token from header
export const extractHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const verifyToken = async (token) => {
  // check if this my token
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decode) {
    throw new AppErrors(errorMessages.jwt.unautorized_access, 401);
  }
  const user = await User.findById(decode.id);
  // check if user not found
  if (!user) {
    logger.error("user not found");
    throw new AppErrors(errorMessages.jwt.expired_token, 401);
  }
  if (!user.is_active) {
    logger.error("user not active");
    throw new AppErrors(errorMessages.jwt.expired_token, 401);
  }
  // check if this token after user change password
  if (user.isPasswordChangedAfterJwt(decode.iat)) {
    logger.error("user change password after jwt");
    throw new AppErrors(errorMessages.jwt.expired_token, 401);
  }
  return user;
};

// create jwt token
export const createJWTToken = (user) => {
  try {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      }
    );

    return token;
  } catch (err) {
    logger.error("JWT Creation", err);
  }
};

// protect endpoint
export const protect = (requireAuthentication = true) => {
  return asyncWrapper(async (req, res, next) => {
    const token = await extractHeader(req);
    if (requireAuthentication && !token) {
      return next(new AppErrors(errorMessages.jwt.unautorized_access, 401));
    }
    if (token) {
      const user = await verifyToken(token);
      req.user = user;
      return next();
    }
    next();
  });
};

// authorize roles
export const authorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppErrors(errorMessages.jwt.access_denied, 403));
    }
    next();
  };
};
