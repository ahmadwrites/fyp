import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
    },
    raterId: {
      type: String,
    },
    rateeId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    overallRating: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", RatingSchema);
