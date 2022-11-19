import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
    },
    members: {
      type: Array,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
