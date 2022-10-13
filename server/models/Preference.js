import mongoose from "mongoose";

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
    maxLocation: {
      type: Number,
      default: 80,
    },
    level: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Preferance", PreferenceSchema);
