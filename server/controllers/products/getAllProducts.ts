import { NextFunction, Request, Response } from "express";
import ProductRepo from "../../models/ProductModel";

import services from "../../services/productsService";
import { ApiError } from "../../middlewares/errors/ApiError";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queries = req.query;
  const products =
    queries && Object.keys(queries).length > 0
      ? await services.queryHandling(queries)
      : await services.findAll();

  res.status(200).json(products);
};
