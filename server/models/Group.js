import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    followedUsers: {
      type: [String],
    },
    followers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Group", GroupSchema);
