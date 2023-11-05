import { CreateProductInput } from "../types/CreateProductInput";
import { Product } from "../types/Product";
import { UpdateProductInput } from "../types/UpdateProductInput";
import CategoryRepo from "./CategoryModel";

export class ProductRepo {
  products = [
    {
      id: 1,
      name: "Item 1",
      price: 122,
      description: "some text",
      category: {
        id: 1,
        name: "Shoes",
        images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
      },
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
    {
      id: 2,
      name: "Item 2",
      price: 333,
      description: "some text",
      category: {
        id: 2,
        name: "Clothes",
        images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
      },
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
    {
      id: 3,
      name: "Item 3",
      description: "some text",
      price: 432,
      category: {
        id: 3,
        name: "Accessories",
        images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
      },
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
  ];

  getAll() {
    return this.products;
  }

  getProduct(id: number) {
    return this.products.find((i) => i.id === id);
  }

  createProduct(newProduct: CreateProductInput) {
    const categoriesData = new CategoryRepo();
    const category = categoriesData.categories.find(
      (i) => i.id === newProduct.categoryId
    );
    if (category) {
      newProduct.id = this.products[this.products.length - 1].id + 1;
      delete newProduct.categoryId;
      newProduct.category = category;
      this.products.push(newProduct);
      return newProduct;
    }
    return false;
  }

  updateProduct(updatedProduct: UpdateProductInput, id: number) {
    const indexProduct = this.products.findIndex((i) => i.id === id);
    if (indexProduct !== -1) {
      this.products[indexProduct] = {
        ...this.products[indexProduct],
        ...updatedProduct,
        id,
      };
      return this.products[indexProduct];
    }
    return false;
  }

  deleteProduct(index: number) {
    const productIndex = this.products.findIndex((i) => i.id === index);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
    }
    return productIndex;
  }
}
