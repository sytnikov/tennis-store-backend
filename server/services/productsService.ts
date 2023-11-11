import CategoryRepo from "../models/CategoryModel";
import ProductRepo from "../models/ProductModel";
import { Category } from "../types/Category";
import { CreateProductInput, UpdateProductInput } from "../types/Product";

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

export default { createOne, findAll, removeOne, findOne, updateOne };
