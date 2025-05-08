import express from "express";
import multer from "multer";

// controller
import {
  deleteAllNotification,
  deleteNotification,
  markAllAsRead,
  notificationList,
  readNotification,
} from "./notification.controller.js";

// middleware
import { protect } from "../../middlewares/auth.middleware.js";
import { isMongoId } from "../../validation/isMongoId.validate.js";

const router = express.Router();
const upload = multer();

router.use(protect());
router
  .route("/")
  .get(notificationList)
  .put(markAllAsRead)
  .delete(deleteAllNotification);

router
  .route("/:id")
  .patch(isMongoId, readNotification)
  .delete(isMongoId, deleteNotification);
export default router;
