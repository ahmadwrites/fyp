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
      default: 2,
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
    desc: {
      type: String,
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
      required: true,
    },
    level: {
      type: Number,
    },
    date: {
      type: Date,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
