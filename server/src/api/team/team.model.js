const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
      },
    },
  }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
