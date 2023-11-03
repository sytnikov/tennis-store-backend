import { Product } from "./Product";

export interface UpdateProductInput extends Omit<Product, "id"> {
  id: number;
}
