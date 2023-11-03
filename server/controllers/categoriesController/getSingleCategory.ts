import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import categoriesService from "../../services/categoriesService";

export function getSingleCategory (req: Request, res: Response, next: NextFunction) { 
  const id = Number(req.params.categoryId)
  const category = categoriesService.getSingle(id)
  if (!category) {
    next(ApiError.resourceNotFound("Category not found"))
    return
  }
  res.status(200).json(category)
} 