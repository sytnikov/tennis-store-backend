import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";
import { DecodedUser, WithAuthRequest } from "Auth";

export async function validateUser(
  req: WithAuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.body.headers.Authorization?.split(" ")[1] as string;
  let isUserValid;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    isUserValid = true;
  } catch (e) {
    isUserValid = false;
  }
  res.status(200).json(isUserValid);
}
