import User from "./../user/user.model.js";
// utils
import Email from "../../utils/email.js";
import AppErrors from "../../utils/appErrors.js";
import asyncWrapper from "../../utils/asyncWrapper.js";
import serializeBody from "../../utils/serizlizeBody.js";

// constants
import errorMessages from "../../constants/errorMessages.js";

// validation
import {
  emailPattern,
  namePattern,
  otpPattern,
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
  if (!user.is_active) {
    return next(new AppErrors(errorMessages.activate_account, 403));
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

  // generate otp and send it to user
  const otp = await user.generateOtp(user);
  const resetLink = `${process.env.FRONT_SERVER}/otp?email=${user.email}&is_forget=false`;
  const data = {
    otpCode: otp,
    resetLink: resetLink,
  };
  const sendEmail = new Email(user, data);
  try {
    await sendEmail.activateAccountEmail();

    res.status(201).json({
      userId: user._id,
      email: user.email,
      full_name: user.full_name,
      avatar: user.avatar,
    });
  } catch (err) {
    return next(new AppErrors("Error sending email", 500));
  }
});

// forget password
export const sendOtp = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;
  const { is_forget } = req.query;

  if (!email) {
    return next(new AppErrors(errorMessages.email_required, 400));
  }
  // validate email
  if (!emailPattern.test(email)) {
    return next(new AppErrors(errorMessages.invalid_email, 400));
  }
  // check if this email exist
  const user = await User.findOne({ email });
  if (!user) {
    if (is_forget == "true") {
      return res
        .status(200)
        .json({ message: errorMessages.forger_password_message });
    } else {
      return res
        .status(200)
        .json({ message: errorMessages.activate_account_message });
    }
  }
  logger.info("generat and send  email");

  if (is_forget == "true" && !user.is_active) {
    return next(new AppErrors(errorMessages.activate_account, 403));
  }
  // generate otp
  const otp = await user.generateOtp(user);
  const resetLink = `${process.env.FRONT_SERVER}/otp?email=${email}&is_forget=${
    is_forget ? true : false
  }`;
  const data = {
    otpCode: otp,
    resetLink: resetLink,
  };
  const sendEmail = new Email(user, data);
  try {
    if (is_forget == "true") {
      await sendEmail.forgotPasswordEmail();
    } else {
      await sendEmail.activateAccountEmail();
    }
    await user.save({ validateBeforeSave: false });
    if (is_forget == true) {
      return res
        .status(200)
        .json({ message: errorMessages.forger_password_message });
    } else {
      return res
        .status(200)
        .json({ message: errorMessages.activate_account_message });
    }
  } catch (err) {
    logger.error("error send email", err);
    return next(new AppErrors("Error sending email!", 500));
  }
});

// verify otp
export const verifyOtp = asyncWrapper(async (req, res, next) => {
  const { is_forget } = req.query;
  if (typeof is_forget === "undefined") {
    return next(new AppErrors("Missing (is_forget) in query!", 400));
  }
  const required = ["otp", "email"];
  const filterData = serializeBody(req.body, next, required);
  if (!filterData) {
    return;
  }
  // validation
  let validationErrors = [];
  if (!emailPattern.test(filterData.email)) {
    validationErrors.push({ email: errorMessages.invalid_email });
  }
  if (!otpPattern.test(filterData.otp)) {
    validationErrors.push({ otp: errorMessages.otp.validation_error });
  }
  if (validationErrors?.length > 0) {
    return next(new AppErrors(validationErrors, 400));
  }

  // check if this user exist
  const user = await User.findOne({ email: filterData.email });
  if (!user) {
    return res.status(200).json({
      message: errorMessages.otp.reset_message,
    });
  }
  logger.info("Check otp");

  // check otp expire
  if (user.otp_code === null) {
    if (is_forget == "true") {
      return res.status(200).json({
        message: errorMessages.otp.reset_message,
      });
    } else {
      return res.status(200).json({
        message: errorMessages.otp.activate_message,
      });
    }
  }
  if (user?.otp_expire?.getTime() < Date.now()) {
    return next(new AppErrors({ otp: errorMessages.otp.expired }, 400));
  }

  // check if it's valid
  if (!(await user.compareOtp(filterData.otp, user.otp_code))) {
    return next(new AppErrors({ otp: errorMessages.otp.invalid }, 400));
  }
  if (user.is_active === false) {
    if (is_forget == "true") {
      return next(new AppErrors(errorMessages.activate_account, 403));
    } else {
      user.is_active = true;
    }
  } else {
    if (is_forget == "true") {
      user.is_forget_password = true;
    }
  }

  user.otp_expire = null;
  user.otp_code = null;
  await user.save({ validateBeforeSave: false });
  const message =
    is_forget == "true"
      ? errorMessages.otp.reset_message
      : errorMessages.otp.activate_message;
  return res.status(200).json({ message });
});
// reset password
export const resetPassword = asyncWrapper(async (req, res, next) => {
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

  // check if this user exist
  const user = await User.findOne({ email: filterData.email });
  if (!user) {
    return res.status(200).json({
      message: errorMessages.otp.reset_message,
    });
  }
  if (!user.is_active) {
    return next(new AppErrors(errorMessages.activate_account, 403));
  }
  // check if this user request to change password
  if (!user.is_forget_password) {
    return res.status(200).json({
      message: errorMessages.jwt.access_denied,
    });
  }
  logger.info("change passwords");
  // change password
  user.is_forget_password = false;
  user.password = filterData.password;
  user.password_change_at = new Date();
  await user.save({ validateBeforeSave: false });
  return res.status(200).json({
    message: errorMessages.otp.reset_message,
  });
});
