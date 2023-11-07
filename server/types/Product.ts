import { z } from "zod";
import mongoose from "mongoose";
import { productBodySchema } from "../schemas/productSchema";

export type Product = z.infer<typeof productBodySchema> & {
  id: mongoose.Types.ObjectId;
};
export type UpdateProductInput = Partial<Product>;
export type CreateProductInput = Omit<Product, "id"> & {
  categoryId?: mongoose.Types.ObjectId;
};
