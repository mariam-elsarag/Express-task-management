import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["invitation", "reminder", "alert", "message", "announcement"], // Notification types
      required: [true, "type is required"],
    },
    is_invited: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    type_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Type id is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.notification_id = ret._id;
        delete ret._id;
      },
    },
  }
);
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
