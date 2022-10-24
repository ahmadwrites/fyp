import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
    /* If any */
    venueId: {
      type: String,
    },
    noOfPeople: {
      type: Number,
      required: true,
    },
    /* Set to false once isMatched.length == noOfPeople or the user sets it to false */
    joinable: {
      type: Boolean,
      default: true,
    },
    /* Set to true if the players agree */
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isMatched: {
      type: [String],
    },
    pendingUsers: {
      type: [String],
    },
    paidUsers: {
      type: [String],
    },
    billSettled: {
      type: Boolean,
    },
    isRated: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    location: {
      type: String,
    },
    level: {
      type: Number,
    },
    date: {
      type: Date,
    },
    startTime: {
      type: Number,
    },
    endTime: {
      type: Number,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
