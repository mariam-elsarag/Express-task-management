import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "User is required"],
        },
        role: {
          type: String,
          enum: ["leader", "member"],
          default: "member",
        },
      },
    ],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    Timestamp: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.team_id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
