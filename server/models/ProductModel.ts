import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    images: [{ type: String }],
    category: [
      {
        id: Number,
        name: String,
        images: [String],
      },
    ],
    stock: Number,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Product", ProductSchema);
