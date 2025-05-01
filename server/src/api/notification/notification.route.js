import express from "express";
import multer from "multer";

// controller
import { notificationList } from "./notification.controller.js";

// middleware
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer();

router.route("/").get(protect(), notificationList);
export default router;
