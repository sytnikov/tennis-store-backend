import { FilterQuery } from "mongoose";
import CategoryRepo from "../models/CategoryModel";
import ProductRepo from "../models/ProductModel";
import { Category } from "../types/Category";
import { CreateProductInput, UpdateProductInput } from "../types/Product";
import { ProductQueries } from "../types/ProductQueries";
import ProductModel from "../models/ProductModel";

const createOne = async (newProduct: CreateProductInput) => {
  const category: Category | null = await CategoryRepo.findOne({
    _id: newProduct.categoryId,
  });
  if (category) {
    const product = new ProductRepo(newProduct);
    return await product.save();
  }
  return false;
};

const findAll = async () => {
  return await ProductRepo.find().exec();
};

const removeOne = async (productId: string) => {
  return await ProductRepo.findByIdAndDelete(productId);
};

const updateOne = async (
  updatedProduct: UpdateProductInput,
  productId: string
) => {
  const result = await ProductRepo.findByIdAndUpdate(
    productId,
    updatedProduct,
    {
      new: true,
    }
  );
  return result;
};

const findOne = async (productId: string) => {
  const product = await ProductRepo.findById(productId);
  return product;
};

const queryHandling = async (queries: ProductQueries) => {
  const { page = 1, limit = 10, sort } = queries;

  const pageNumber = +page;
  const pageSize = +limit;

  let sortByPrice: Record<string, "asc" | "desc"> | undefined;
  if (sort) {
    sortByPrice = { price: sort };
  }

  const products = await ProductRepo.find()
    .sort(sortByPrice)
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize);
  return products;
};

export default {
  createOne,
  findAll,
  removeOne,
  findOne,
  updateOne,
  queryHandling,
};
