import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Processed", "Failed"],
    },
    method: {
      type: String,
      enum: [
        "Credit Card",
        "PayPal",
        "Bank Transfer",
        "Stripe",
        "Cash",
        "Apple Pay",
      ],
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Payment", PaymentSchema);
