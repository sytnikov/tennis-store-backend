import { ProductRepo } from "../models/ProductModel";
import { CreateProductInput } from "../types/CreateProductInput";
import { UpdateProductInput } from "../types/UpdateProductInput";

const productsRepo = new ProductRepo();
const createOne = (newProduct: CreateProductInput) => {
  const product = productsRepo.createProduct(newProduct);
  return product;
};

const findAll = () => {
  const products = productsRepo.getAll();
  return products;
};

const removeOne = (id: number) => {
  const index = productsRepo.deleteProduct(id);
  return index;
};

const updateOne = (updatedProduct: UpdateProductInput, id: number) => {
  const product = productsRepo.updateProduct(updatedProduct, id);
  return product;
};

export const findOne = (id: number) => {
  const product = productsRepo.getProduct(id);
  return product;
};

export default { createOne, findAll, removeOne, findOne, updateOne };
