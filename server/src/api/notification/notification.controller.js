// utils
import mongoose from "mongoose";
import ApiFeature from "../../utils/apiFeatures.js";
import asyncWrapper from "./../../utils/asyncWrapper.js";

// model
import Notification from "./notifcation.model.js";
import AppErrors from "../../utils/appErrors.js";

// get notification list for user
export const notificationList = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const feature = new ApiFeature(
    Notification.find({ user }),
    req.query
  ).paginate(20);
  const notification = await feature.getPaginations(Notification, req);
  notification.results = notification.results?.map((item) => {
    let list = {
      notification_id: item?._id,
      type: item?.type,
      type_id: item?.type_id,
      message: item?.message,
      read: item?.read,
      createdAt: item.createdAt,
    };
    if (item?.type === "invitation") {
      list.is_invited = item?.is_invited;
    }
    return {
      list,
    };
  });
  res.status(200).json(notification);
});

// read notification
export const readNotification = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppErrors("Not valid id", 400));
  }

  const notification = await Notification.findOne({ _id: id, user: user });
  if (!notification) {
    return next(new AppErrors("Notification not found", 404));
  }
  notification.read = true;
  await notification.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ message: "Successfully read notification", read: true });
});
