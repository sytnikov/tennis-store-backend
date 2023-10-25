import ProductsService from "../services/productsService.js";
import { ApiError } from "../errors/ApiError.js";
export function findAllProduct(_, res) {
    const products = ProductsService.findAll();
    res.json({ products });
}
export function findOneProduct(req, res, next) {
    const productId = Number(req.params.productId);
    const product = ProductsService.findOne(productId);
    if (!product) {
        next(ApiError.resourceNotFound("Product not found."));
        return;
    }
    res.json({ product });
}
export function createOneProduct(req, res) {
    const newProduct = req.body;
    const product = ProductsService.createOne(newProduct);
    res.status(201).json({ product });
}
export default {
    findOneProduct,
    findAllProduct,
    createOneProduct,
};
