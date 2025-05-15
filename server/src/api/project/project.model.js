import mongoose, { Schema } from "mongoose";

// constant
import errorMessages from "../../constants/errorMessages.js";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, errorMessages.project.name],
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["planned", "in_progress", "completed", "on_hold", "delayed"],
      default: "planned",
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, errorMessages.project.createdBy],
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    start_date: {
      type: Date,
      required: [true, errorMessages.project.start_date],
    },
    end_date: {
      type: Date,
      required: [true, errorMessages.project.end_date],
      validate: {
        validator: function () {
          return this.end_date > this.start_date;
        },
        message: errorMessages.project.invalidDateRange,
      },
    },
    is_archived: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },

  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.project_id = ret._id;
        delete ret._id;
        delete ret._v;
      },
    },
  }
);
const Project = mongoose.model("Project", projectSchema);
export default Project;
