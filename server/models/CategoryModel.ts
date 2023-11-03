import { Category, CreateCategoryInput, UpdateCategoryInput } from "../types/Category";

export class CategoryRepo {
  categories = [
    {
      id: 1,
      name: "Shoes",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
    {
      id: 2,
      name: "Clothes",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
    {
      id: 3,
      name: "Accessories",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
    {
      id: 23,
      name: "Children's clothes",
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
  ];

  getAll() {
    return this.categories
  }

  getSingle(categoryId: number) {
    const category = this.categories.find(cat => cat.id === categoryId)
    return category
  }

  getSingleByName(categoryName: string) {
    const category = this.categories.find(cat => cat.name === categoryName)
    return category
  }

  createCategory(createData: CreateCategoryInput) {
    const id = this.categories.length + 1;
    const newCategory: Category = {
      id: id,
      name: createData.name,
      images: createData.images
    }
    this.categories.push(newCategory)
    return newCategory
  }

  updateCategory(id: number, updateData: UpdateCategoryInput) {
    const foundIndex = this.categories.findIndex((cat) => cat.id === id);
    if (foundIndex !== -1) {
      const updatedCategory = {
        ...this.categories[foundIndex],
        ...updateData
      }
      this.categories.splice(foundIndex, 1, updatedCategory)
      return updatedCategory
    }
    return false
  }

  deleteCategory(id: number) {
    const foundIndex = this.categories.findIndex(cat => cat.id === id)
    if (foundIndex !== -1) {
      this.categories.splice(foundIndex, 1)
      return foundIndex
    }
    return foundIndex
  }
}