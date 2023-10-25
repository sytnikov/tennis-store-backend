import { Product } from "../types/products.js"

// Simulating a DataBase
export class ProductRepo {
  products = [
    {
      id: 1,
      name: "Laptop",
      image: "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg",
      description: "High-performance laptop for all your needs.",
      categories: [1, 2],
      variants: ["8GB RAM", "16GB RAM"],
      sizes: ["13-inch", "15-inch"],
    },
    {
      id: 2,
      name: "Smartphone",
      image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SL1500_.jpg",
      description: "Latest smartphone with advanced features.",
      categories: [1, 3],
      variants: ["64GB", "128GB"],
      sizes: [],
    },
  ]

  findOne(productId: number) {
    const product = this.products.find((product) => product.id === productId)
    return product
  }

  findAll() {
    return this.products
  }

  createOne(newProduct: Product) {
    this.products = [...this.products, newProduct]
    return newProduct
  }
}
