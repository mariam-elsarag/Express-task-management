import express from "express";
import multer from "multer";

// controller
import { createNewUser, login } from "./auth.controller.js";

const router = express.Router();
const upload = multer();

router.route("/login").post(upload.none(), login);
router.route("/register").post(upload.none(), createNewUser);

export default router;
