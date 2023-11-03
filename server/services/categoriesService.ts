import { CategoryRepo } from "../models/CategoryModel";
import { CreateCategoryInput } from "../types/CreateCategoryInput";
import { UpdateCategoryInput } from "../types/UpdateCategoryInput";

const categoriesRepo = new CategoryRepo();

function getAll() {
  const categories = categoriesRepo.getAll();
  return categories;
}

function getSingle(categoryId: number) {
  const category = categoriesRepo.getSingle(categoryId);
  return category;
}

function getSingleByName(categoryName: string) {
  const category = categoriesRepo.getSingleByName(categoryName);
  return category;
}

function createCategory(createData: CreateCategoryInput) {
  const newCategory = categoriesRepo.createCategory(createData);
  return newCategory;
}

function updateCategory(id: number, updateData: UpdateCategoryInput) {
  const updatedCategory = categoriesRepo.updateCategory(id, updateData)
  return updatedCategory
}

function deleteCategory(id: number) {
  const foundIndex = categoriesRepo.deleteCategory(id)
  return foundIndex
}
  
export default {
  getAll,
  getSingle,
  getSingleByName,
  createCategory,
  updateCategory,
  deleteCategory
};
