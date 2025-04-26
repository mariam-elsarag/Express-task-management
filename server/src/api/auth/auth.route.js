import express from "express";
import multer from "multer";

// controller
import {
  createNewUser,
  sendOtp,
  login,
  resetPassword,
  verifyOtp,
} from "./auth.controller.js";

const router = express.Router();
const upload = multer();

router.route("/login").post(upload.none(), login);
router.route("/register").post(upload.none(), createNewUser);

router.route("/otp").post(upload.none(), sendOtp);
router.route("/verify-otp").post(upload.none(), verifyOtp);
router.route("/reset-password").post(upload.none(), resetPassword);

export default router;
