import mongoose from "mongoose";
import AppErrors from "../../utils/appErrors.js";
import asyncWrapper from "../../utils/asyncWrapper.js";
import serializeBody from "../../utils/serizlizeBody.js";
import Team from "./team.model.js";
import Notification from "../notification/notifcation.model.js";
import logger from "../../utils/logger.js";
import Invitation from "./invitation.model.js";
import { connectedUsers, io } from "../../config/socket.js";

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
  // notify users via socket
  filterData.members.forEach(({ user: memberId }) => {
    const socketId = connectedUsers[memberId];
    console.log(connectedUsers, "connect");
    if (socketId) {
      logger.info("Send via socket");
      io.to(socketId).emit("notification", {
        type: "invitation",
        message: `You have been invited to join ${team.name}`,
        type_id: team._id,
        is_invited: true,
      });
    }
  });
  // a- invited via notification
  try {
    await Promise.all(
      filterData.members.map(async (item) => {
        await Notification.create({
          user: item?.user,
          type: "invitation",
          message: `You have been invited to join ${team.name}`,
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

// accept or reject invitation
export const updateInvitationStatus = asyncWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const { id: teamId } = req.params;
  const filterData = serializeBody(req.body, next, ["status"]);
  if (!filterData) {
    return;
  }

  // field validation
  const rawStatus = filterData.status;

  const status =
    rawStatus === true || rawStatus === "true"
      ? true
      : rawStatus === false || rawStatus === "false"
      ? false
      : null;
  console.log(status, "status");
  if (status === null) {
    return next(new AppErrors("Status must be true or false", 400));
  }
  // find user with this invitation
  const user = await Invitation.findOne({
    team: teamId,
    "invited_users.user": userId,
  });
  if (!user) {
    return next(new AppErrors("You are not invited to this team", 404));
  }
  // move this user to team

  const invitedUser = user.invited_users.at(0);

  if (!invitedUser) {
    return next(new AppErrors("You are not invited to this team", 403));
  }

  // step 1 find team
  if (status) {
    const team = await Team.findByIdAndUpdate(
      teamId,
      {
        $push: {
          members: {
            user: invitedUser.user,
            role: invitedUser.role,
          },
        },
      },
      { new: true }
    );

    if (!team) {
      return next(new AppErrors("Team no longer exists", 400));
    }
  }
  logger.info("after add member to team");

  // update notification
  await Notification.updateMany(
    {
      user: userId,
      type_id: teamId,
    },
    {
      $set: {
        is_invited: false,
      },
    }
  );
  // remove user form invitation and if there's no users in list remove this invitation list
  const updatedInvitation = await Invitation.findOneAndUpdate(
    { team: teamId },
    {
      $pull: {
        invited_users: { user: userId },
      },
    },
    { new: true }
  );

  if (updatedInvitation && updatedInvitation.invited_users.length === 0) {
    await Invitation.deleteOne({ team: teamId });
  }
  const message =
    filterData.status == "true"
      ? "Successfully accept invitation"
      : "Successfully reject invitation";
  res.status(200).json({ message });
});
// invite member to team
export const inviteMemberToTeam = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const required = ["invited_users", "team"];
  res.status(200).json({ test: "k" });
});
