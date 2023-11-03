import { Product } from "./Product";

export interface CreateProductInput extends Product {
  categoryId?: number;
}
