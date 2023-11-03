import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const createData = req.body;
  const category = categoriesService.getSingleByName(createData.name)
  if (category) {
    next(ApiError.badRequest("The category with the same name already exists"));
    return;
  }
  const newCategory = categoriesService.createCategory(createData);
  res.status(201).json(newCategory);
}
