import mongoose from "mongoose";
import AppErrors from "../../utils/appErrors.js";
import asyncWrapper from "../../utils/asyncWrapper.js";
import serializeBody from "../../utils/serizlizeBody.js";
import Team from "./team.model.js";
import Notification from "../notification/notifcation.model.js";
import logger from "../../utils/logger.js";
import Invitation from "./invitation/invitation.model.js";
import { connectedUsers, io } from "../../config/socket.js";
import ApiFeature from "../../utils/apiFeatures.js";
import User from "../user/user.model.js";

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
    members: filterData.members?.map(({ user, role }) => ({
      user,
      role,
    })),
    created_by: user._id,
  });
  logger.info("Successfully create team");
  // invite member
  await Invitation.create({
    team: team._id,
    invited_users: filterData.members?.map(({ user }) => user),
    invited_by: user._id,
  });

  logger.info("Successfully invite team member");
  // notify users via socket
  filterData.members.forEach(({ user: memberId }) => {
    const socketId = connectedUsers[memberId];

    if (socketId) {
      logger.info("Send via socket");
      // send notification
      io.to(socketId).emit("notification", {
        type: "invitation",
        message: `You have been invited to join ${team.name}`,
        type_id: team._id,
        is_invited: true,
      });
      // send to invitation
      io.to(socketId).emit("invitation:new", {
        invitation_id: team._id,
        team: team.name,
        date: new Date(Date.now()).toLocaleString("en", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        invited_by: {
          full_name: user.full_name,
          avatar: user.avatar,
        },
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

// get all users
export const getAllUsers = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const feature = new ApiFeature(User.find({ _id: { $ne: user } }), req.query)
    .paginate(5)
    .search(["full_name", "email"]);
  const users = await feature.getPaginations(User, req);
  if (users.results?.length > 0) {
    users.results = users.results?.map((item) => ({
      userId: item?._id,
      full_name: item?.full_name,
      avatar: item.avatar,
    }));
  }
  res.status(200).json(users);
});

// get team list
export const getAllTeams = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const feature = new ApiFeature(
    Team.find({ created_by: user }).populate({
      path: "members.user",
      select: "_id avatar full_name",
    }),
    req.query
  )
    .paginate(5)
    .search(["name"]);
  const users = await feature.getPaginations(User, req);

  if (users.results?.length > 0) {
    users.results = users.results?.map((item) => ({
      teamId: item._id,
      team_name: item.name,
      members: item.members.filter(
        (m) =>
          m.status === "accepted" && {
            avatar: m.user.avatar,
            userId: m.user._id,
            full_name: m.user.full_name,
          }
      ),
      porjects: item.Projects || [],
    }));
  }
  res.status(200).json(users);
});
