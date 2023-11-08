import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    images: [{ type: String }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    stock: Number,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Product", ProductSchema);
