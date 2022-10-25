import mongoose from "mongoose";

const NotifcationSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    /* The post that the notification belongs to */
    postId: {
      type: String,
    },
    /* The notifcation title */
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    /* The notifcation description */
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotifcationSchema);
