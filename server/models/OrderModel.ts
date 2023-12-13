import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalAmount: Number,
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default mongoose.model("Order", orderSchema);
