import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export async function getAllCategories(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const categories = await categoriesService.getAll();
  if (!categories) {
    next(ApiError.resourceNotFound("Categories data not found"));
    return;
  }
  if (categories.length <= 0) {
    res.status(200).json({msg: "No categories data yet"})
    return
  }
  res.status(200).json(categories);
}
