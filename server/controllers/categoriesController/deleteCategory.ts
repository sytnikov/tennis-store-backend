import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export function deleteCategory (req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.categoryId)
  const foundIndex = categoriesService.deleteCategory(id)
  if (foundIndex === -1) {
    next(ApiError.resourceNotFound("Category can't be deleted: categoryId not found"))
    return
  }
  res.status(200).json({message: "Category successfully deleted"})
}