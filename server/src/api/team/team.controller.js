import mongoose from "mongoose";
import AppErrors from "../../utils/appErrors.js";
import asyncWrapper from "../../utils/asyncWrapper.js";
import serializeBody from "../../utils/serizlizeBody.js";
import Team from "./team.model.js";
import Notification from "../notification/notifcation.model.js";
import logger from "../../utils/logger.js";
import Invitation from "./invitation.model.js";

export const createTeam = asyncWrapper(async (req, res, next) => {
  const user = req.user;
  const required = ["name", "members"];
  const filterData = serializeBody(req.body, next, required);
  if (!filterData) {
    return;
  }

  // validation
  if (!Array.isArray(filterData.members)) {
    return next(new AppErrors("Members must be array have user and role", 400));
  } else if (filterData.members) {
    filterData?.members.map(({ user }, index) => {
      if (!user) {
        return next(new AppErrors(`Member[${index}] missing user`, 400));
      }
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return next(new AppErrors(`Member[${index}] has invalid user id`, 400));
      }
    });
  }

  // create team
  const team = await Team.create({
    name: filterData.name,
    created_by: user._id,
  });
  logger.info("Successfully create team");
  // invite member
  await Invitation.create({
    team: team._id,
    invited_users: filterData.members?.map(({ user, role }) => ({
      user,
      role,
    })),
    invited_by: user._id,
  });
  logger.info("Successfully invite team member");
  // a- invited via notification
  try {
    await Promise.all(
      filterData.members.map(async (item) => {
        await Notification.create({
          user: item?.user,
          type: "invitation",
          message: `${user.full_name} invited to join ${team.name}`,
          type_id: team._id,
          is_invited: true,
        });
      })
    );
  } catch (err) {
    logger.error("Error creating notifications for invited members", err);
    return next(new AppErrors("Can't invite users", 500));
  }

  res.status(201).json({
    message: "Team created and invitations sent successfully to team members.",
    team,
  });
});

// invite member to team
export const inviteMemberToTeam = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const required = ["invited_users", "team"];
  res.status(200).json({ test: "k" });
});
