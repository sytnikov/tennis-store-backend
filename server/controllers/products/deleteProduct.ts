import { NextFunction, Request, Response } from "express";

import services from "../../services/productsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.productId;
  const deleted = await services.removeOne(id);
  if (!deleted) {
    next(ApiError.resourceNotFound("Product id is not found"));
    return;
  }
  res.status(200).json({ message: "Product deleted successfully" });
};
