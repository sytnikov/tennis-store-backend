import { NextFunction, Request, Response } from "express";
import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password, roleId } = req.body;
  const user = await usersService.register({name, email, password, roleId});
  if (!user) {
    next(ApiError.badRequest("User not created"));
    return;
  }
  res.status(201).json(user);
}
