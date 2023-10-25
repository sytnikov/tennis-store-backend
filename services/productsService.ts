import { ProductRepo } from "../models/Product.js"
import { Product } from "../types/products.js"

const productsRepo = new ProductRepo()

function findAll() {
  const products = productsRepo.findAll()

  return products
}

function findOne(productId: number) {
  const product = productsRepo.findOne(productId)

  return product
}

function createOne(product: Product) {
  const newProduct = productsRepo.createOne(product)

  return newProduct
}

export default {
  findOne,
  findAll,
  createOne,
}
