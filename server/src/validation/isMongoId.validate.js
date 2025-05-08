import mongoose from "mongoose";
import AppErrors from "../utils/appErrors.js";
export const isMongoId = (req, res, next) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) {
    next();
  } else {
    return next(new AppErrors("Invalid id", 400));
  }
};
