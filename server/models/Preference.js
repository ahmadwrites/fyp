import mongoose from "mongoose";

// min.max level, min.max distance, min.max no of people
// min.max age, location, gender, date

const PreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    minAge: {
      type: Number,
      default: 18,
    },
    maxAge: {
      type: Number,
      default: 60,
    },
    location: {
      type: String,
    },
    maxDistance: {
      type: Number,
      default: 80,
    },
    minLevel: {
      type: Number,
    },
    maxLevel: {
      type: Number,
    },
    gender: {
      type: String,
      default: "all",
    },
    minNoOfPeople: {
      type: Number,
      default: 2,
    },
    maxNoOfPeople: {
      type: Number,
      default: 4,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Preference", PreferenceSchema);
