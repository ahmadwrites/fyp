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
    },
    desc: {
      type: String,
      required: true,
    },
    overallRating: {
      type: Number,
      required: true,
      minimum: 0,
      maximum: 5,
    },
    level: {
      type: Number,
      required: true,
      minimum: 0,
      maximum: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", RatingSchema);
