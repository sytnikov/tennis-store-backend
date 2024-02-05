import { NextFunction, Request, Response } from "express";
import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";

export async function logIn(req: Request, res: Response, next: NextFunction) {
  const {email, password} = req.body
  const loggedInUser = await usersService.logIn(email, password)
  if (loggedInUser === null) {
    next(ApiError.forbidden("Invalid email or password"))
    return
  }
  res.status(200).json(loggedInUser);
}
