import express from "express";
import multer from "multer";

// middleware
import { authorized, protect } from "../../middlewares/auth.middleware.js";
import { createTeam, getAllUsers } from "./team.controller.js";

import {
  InvitationList,
  updateInvitationStatus,
} from "./invitation/invitation.controller.js";

const router = express.Router();
const upload = multer();

router.use(protect());
router.route("/invite").get(authorized("user"), InvitationList);
// routes for user
router
  .route("/:id/invite")
  .patch(authorized("user"), upload.none(), updateInvitationStatus);

// for route only manager and admin
router.use(authorized("admin", "manager"));
router.route("/").post(upload.none(), createTeam);
router.route("/user").get(getAllUsers);

export default router;
