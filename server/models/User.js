import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    avatar: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      default: "player",
    },
    followedGroups: {
      type: [String],
    },
    followedUsers: {
      type: [String],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
