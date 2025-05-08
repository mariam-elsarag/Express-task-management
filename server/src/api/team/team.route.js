import express from "express";
import multer from "multer";

// middleware
import { authorized, protect } from "../../middlewares/auth.middleware.js";
import {
  createTeam,
  inviteMemberToTeam,
  updateInvitationStatus,
} from "./team.controller.js";

const router = express.Router();
const upload = multer();

router.use(protect());
// routes for usr
router
  .route("/:id/invite")
  .patch(authorized("user"), upload.none(), updateInvitationStatus);

// for route only manager and admin
router.use(authorized("admin", "manager"));
router.route("/").post(upload.none(), createTeam);
router.route("/invite").post(upload.none(), inviteMemberToTeam);
export default router;
