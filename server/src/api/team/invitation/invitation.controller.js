import Team from "../team.model.js";
import Invitation from "./invitation.model.js";
import Notification from "../../notification/notifcation.model.js";

// utils
import logger from "../../../utils/logger.js";
import AppErrors from "../../../utils/appErrors.js";
import asyncWrapper from "../../../utils/asyncWrapper.js";
import serializeBody from "../../../utils/serizlizeBody.js";

// config
import { connectedUsers, io } from "../../../config/socket.js";

// invitation list
export const InvitationList = asyncWrapper(async (req, res, next) => {
  const user = req.user;

  const invitation = await Invitation.find({
    "invited_users.user": user._id,
  }).populate([
    { path: "team", select: "name _id" },
    { path: "invited_by", select: "full_name avatar" },
  ]);

  let serializeRetrun = invitation
    ? invitation?.map((item) => ({
        invitation_id: item.team._id,
        team: item.team.name,
        invited_by: {
          full_name: item.invited_by.full_name,
          avatar: item.invited_by.avatar,
        },
        date: new Date(item?.createdAt).toLocaleString("en", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      }))
    : [];
  res.status(200).json(serializeRetrun);
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
  if (status === null) {
    return next(new AppErrors("Status must be true or false", 400));
  }
  // find user with this invitation
  const user = await Invitation.findOne({
    team: teamId,
    "invited_users.user": userId,
  }).populate({ path: "invited_users.user", select: "_id full_name" });

  if (!user) {
    return next(new AppErrors("You are not invited to this team", 404));
  }
  // move this user to team

  const invitedUser = user.invited_users.at(0);

  if (!invitedUser) {
    return next(new AppErrors("You are not invited to this team", 403));
  }

  if (status) {
    // step 1 find team
    const team = await Team.findByIdAndUpdate(
      teamId,
      {
        $push: {
          members: {
            user: invitedUser.user._id,
            role: invitedUser.role,
          },
        },
      },
      { new: true }
    );

    if (!team) {
      return next(new AppErrors("Team no longer exists", 400));
    }
    // send notifcation to team creator that this person accept invitation
    await Notification.create({
      user: user.invited_by,
      type: "invitation_acceptance",
      message: `${invitedUser.user.full_name} accepted your invitation to join your team`,
      type_id: team._id,
    });
    // send it via socket
    const socketId = connectedUsers[user.invited_by];
    if (socketId) {
      io.to(socketId).emit("notification", {
        type: "invitation_acceptance",
        message: `${invitedUser.user.full_name} accepted your invitation to join your team`,
        type_id: team._id,
      });
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
  const message = filterData.status
    ? "Successfully accept invitation"
    : "Successfully reject invitation";
  res.status(200).json({ message });
});
