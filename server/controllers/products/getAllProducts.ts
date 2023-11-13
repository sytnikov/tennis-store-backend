import { NextFunction, Request, Response } from "express";

import services from "../../services/productsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const getAllProducts = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await services.findAll();
  res.status(200).json(products);
};
