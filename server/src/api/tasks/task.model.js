import mongoose from "mongoose";
import errorMessages from "../../constants/errorMessages.js";

const taskSchema = new mongoose.Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    name: {
      type: String,
      required: [true, errorMessages.task.name],
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: [
        "todo",
        "pending",
        "in_progress",
        "review",
        "blocked",
        "completed",
        "archived",
      ],
      default: "todo",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: [true, errorMessages.task.priority],
    },
    due_date: {
      type: Date,
      required: [true, errorMessages.task.dueDate],
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, errorMessages.project.createdBy],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.task_id = ret._id;
        delete ret._id;
        delete ret._v;
      },
    },
  }
);
const task = mongoose.model("Task", taskSchema);
export default task;
