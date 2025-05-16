import express from "express";

// middleware
import upload from "../../middlewares/multer.middleware.js";
import { authorized, protect } from "../../middlewares/auth.middleware.js";

// controller
import {
  createProject,
  getProjectDetails,
  getProjects,
  updateProject,
} from "./project.controller.js";

// validator
import { isMongoId } from "../../validation/isMongoId.validate.js";

const router = express.Router();

router.use(protect());

router.use(authorized("admin", "manager"));
router.route("/").post(upload.single("image"), createProject).get(getProjects);
router
  .route("/:id")
  .patch(isMongoId, upload.single("image"), updateProject)
  .get(isMongoId, getProjectDetails);

export default router;
