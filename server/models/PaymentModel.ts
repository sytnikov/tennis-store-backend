import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
    },
    method: {
      type: String,
      enum: ["credit_card", "bank_transfer", "paypal"],
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Payment", PaymentSchema);
