import express from "express";

// controller
import { login } from "./auth.controller.js";

const router = express.Router();
router.route("/login").post(login);
export default router;
