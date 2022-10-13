import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    venueId: {
      type: String,
    },
    merchantId: {
      type: String,
    },
    userId: {
      type: String,
    },
    paymentType: {
      type: String,
    },
    paymentAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
