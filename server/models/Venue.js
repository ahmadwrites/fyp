import mongoose from "mongoose";

const VenueSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    address: {
      type: String,
    },
    sport: {
      type: [String],
    },
    available: {
      type: Boolean,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Venue", VenueSchema);
