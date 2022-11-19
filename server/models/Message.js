import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    read: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
