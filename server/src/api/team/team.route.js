import express from "express";
import multer from "multer";

// middleware
import { authorized, protect } from "../../middlewares/auth.middleware.js";
import { createTeam, inviteMemberToTeam } from "./team.controller.js";

const router = express.Router();
const upload = multer();

router.use(protect(), authorized("admin", "manager"));
router.route("/").post(upload.none(), createTeam);
router.route("/invite").post(upload.none(), inviteMemberToTeam);
export default router;
