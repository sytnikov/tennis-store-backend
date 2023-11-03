import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export function getAllCategories(
  _: Request,
  res: Response,
  next: NextFunction
) {
  
  const categories = categoriesService.getAll()
  if (categories.length <= 0) {
    next(ApiError.resourceNotFound("Categories data not found"));
    return
  }
  res.status(200).json(categories)
}
