import { ProductRepo } from "../models/Product.js";
const productsRepo = new ProductRepo();
function findAll() {
    const products = productsRepo.findAll();
    return products;
}
function findOne(productId) {
    const product = productsRepo.findOne(productId);
    return product;
}
function createOne(product) {
    const newProduct = productsRepo.createOne(product);
    return newProduct;
}
export default {
    findOne,
    findAll,
    createOne,
};
