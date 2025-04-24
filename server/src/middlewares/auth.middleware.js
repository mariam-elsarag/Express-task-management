import jwt from "jsonwebtoken";

// model
import User from "../api/user/user.model.js";
// utils
import logger from "../utils/logger.js";
import appErrors from "../utils/appErrors.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// constant
import errorMessages from "../constants/errorMessages.js";

// to extract token from header
export const extractHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    return req.headers.authorization.split(":")[1];
  }
  return null;
};

const verifyToken = async (token) => {
  // check if this my token
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) {
    throw new appErrors(errorMessages.jwt.unautorized_access, 401);
  }
  const user = await User.findById(decode.id);
  // check if user not found
  if (!user) {
    throw new appErrors(errorMessages.user_not_found, 404);
  }
  // check if this token after user change password
  if (await user.checkChangePasswordAfterJwt(decode.iat)) {
    throw new appErrors(errorMessages.jwt.expired_token, 401);
  }
  return user;
};

// create jwt token
export const createJWTToken = async (user) => {
  try {
    const token = jwt.sign(
      { id: user._id, role: user.role }.process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXP,
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
      return next(new appErrors(errorMessages.unautorized_access, 401));
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
      return next(new appErrors(errorMessages.jwt.access_denied, 403));
    }
    next();
  };
};
