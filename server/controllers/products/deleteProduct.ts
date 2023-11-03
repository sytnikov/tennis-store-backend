import { NextFunction, Request, Response } from "express";


import services from "../../services/productsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const deleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.id;
  const index = services.removeOne(id);
  if (index === -1) {
    next(ApiError.resourceNotFound("Product id is not found"));
    return;
  }
  res.status(200).json({ message: "Product deleted successfully" });
};
