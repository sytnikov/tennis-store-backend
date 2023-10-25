import { NextFunction, Request, Response } from "express"

import ProductsService from "../services/productsService.js"
import { ApiError } from "../errors/ApiError.js"

export function findAllProduct(_: Request, res: Response) {
  const products = ProductsService.findAll()

  res.json({ products })
}

export function findOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = Number(req.params.productId)
  const product = ProductsService.findOne(productId)

  if (!product) {
    next(ApiError.resourceNotFound("Product not found."))
    return
  }

  res.json({ product })
}

export function createOneProduct(req: Request, res: Response) {
  const newProduct = req.body
  const product = ProductsService.createOne(newProduct)

  res.status(201).json({ product })
}

export default {
  findOneProduct,
  findAllProduct,
  createOneProduct,
}
