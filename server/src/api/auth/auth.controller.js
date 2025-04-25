import User from "./../user/user.model.js";
// utils
import AppErrors from "../../utils/appErrors.js";
import asyncWrapper from "../../utils/asyncWrapper.js";
import serializeBody from "../../utils/serizlizeBody.js";

// constants
import errorMessages from "../../constants/errorMessages.js";

// validation
import {
  emailPattern,
  namePattern,
  passwordPattern,
} from "./../../validation/pattern.js";

// middlewares
import { createJWTToken } from "../../middlewares/auth.middleware.js";
import logger from "../../utils/logger.js";

export const login = asyncWrapper(async (req, res, next) => {
  const required = ["email", "password"];
  const filterData = serializeBody(req.body, next, required);
  if (!filterData) {
    return;
  }

  // validation
  let validationErrors = [];
  if (!emailPattern.test(filterData.email)) {
    validationErrors.push({ email: errorMessages.invalid_email });
  }
  if (!passwordPattern.test(filterData.password)) {
    validationErrors.push({ password: errorMessages.week_password });
  }
  if (validationErrors?.length > 0) {
    return next(new AppErrors(validationErrors, 400));
  }

  const user = await User.findOne({ email: filterData.email });
  if (!user) {
    return next(new AppErrors(errorMessages.invalid_credentials, 401));
  }
  // check user password

  if (!(await user.comparePassword(filterData.password, user.password))) {
    return next(new AppErrors(errorMessages.invalid_credentials, 401));
  }
  const token = createJWTToken(user);

  res.cookie("token", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  res.cookie("full_name", user.full_name, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  res.cookie("avatar", user.avatar, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  logger.info("User Logged in");
  res.status(200).json({
    token: token,
    full_name: user.full_name,
    avatar: user.avatar,
    role: user.role,
    userId: user._id,
  });
});

// create new user
export const createNewUser = asyncWrapper(async (req, res, next) => {
  const required = ["full_name", "email", "password"];
  const filterData = serializeBody(req.body, next, required);
  if (!filterData) {
    return;
  }

  // validation
  let validationErrors = [];
  if (!emailPattern.test(filterData.email)) {
    validationErrors.push({ email: errorMessages.invalid_email });
  }
  if (!namePattern.test(filterData.full_name)) {
    validationErrors.push({ full_name: errorMessages.invalid_full_name });
  }
  if (!passwordPattern.test(filterData.password)) {
    validationErrors.push({ password: errorMessages.week_password });
  }
  if (validationErrors?.length > 0) {
    return next(new AppErrors(validationErrors, 400));
  }
  const user = await User.create({
    email: filterData.email,
    password: filterData.password,
    full_name: filterData.full_name,
    avatar: `https://avatar.iran.liara.run/username?username=${filterData?.full_name}&background=1c1f2e&color=c5d0e6&length=1`,
  });

  res.status(201).json({
    userId: user._id,
    email: user.email,
    full_name: user.full_name,
    avatar: user.avatar,
  });
});
