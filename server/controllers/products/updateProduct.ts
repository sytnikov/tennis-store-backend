import { NextFunction, Request, Response } from "express";

import services from "../../services/productsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  console.log("🚀 ~ file: updateProduct.ts:12 ~ id:", id)
  const updatedProduct = req.body;
  const product = await services.updateOne(updatedProduct, id);
  if (!product) {
    next(ApiError.resourceNotFound("Product id is not found"));
    return;
  }
  res.status(200).json(product);
};
