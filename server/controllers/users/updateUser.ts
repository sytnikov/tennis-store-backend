import { Request, Response, NextFunction } from "express";

import { ApiError } from "../../middlewares/errors/ApiError";
import usersService from "../../services/usersService";

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.userId;
  const updatedUser = req.body;
  const user = await usersService.updateUser(id, updatedUser);
  if (!user) {
    next(new ApiError(404, "User not found"));
    return;
  }
  res.status(200).json(user);
}
