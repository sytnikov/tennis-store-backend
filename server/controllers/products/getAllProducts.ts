import { NextFunction, Request, Response } from "express";

import services from "../../services/productsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const getAllProducts = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const products = services.findAll();
  if (products) {
    res.status(200).json(products);
    return;
  }
  next(ApiError.resourceNotFound("Products data not found"));
};
