import mongoose, { Schema } from "mongoose";

const invitationsSchema = new mongoose.Schema(
  {
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team is requied"],
    },
    invited_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "invited users is requried"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    invited_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.invitation_id = ret._id;
        delete ret._id;
      },
    },
  }
);
const Invitation = mongoose.model("Invitation", invitationsSchema);
export default Invitation;
