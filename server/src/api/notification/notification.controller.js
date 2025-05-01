// utils
import ApiFeature from "../../utils/apiFeatures.js";
import asyncWrapper from "./../../utils/asyncWrapper.js";

// model
import Notification from "./notifcation.model.js";

// get notification list for user
export const notificationList = asyncWrapper(async (req, res, next) => {
  const user = req.user._id;
  const feature = new ApiFeature(
    Notification.find({ user }),
    req.query
  ).paginate(20);
  const notification = await feature.getPaginations(Notification, req);
  notification.results = notification.results?.map((item) => {
    return {
      notification_id: item?._id,
      type: item?.type,
      message: item?.message,
      read: item?.read,
      createdAt: item.createdAt,
    };
  });
  res.status(200).json(notification);
});

//
