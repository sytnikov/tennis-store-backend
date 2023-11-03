import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.categoryId);
  const updateData = req.body;
  const updatedCategory = categoriesService.updateCategory(id, updateData);
  if (!updatedCategory) {
    next(ApiError.badRequest("Category not updated"));
    return;
  }
  res.status(200).json(updatedCategory);
}
