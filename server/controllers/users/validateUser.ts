import jwt from "jsonwebtoken";
import { Response } from "express";
import { WithAuthRequest } from "Auth";

export async function validateUser(
  req: WithAuthRequest,
  res: Response
) {
  console.log('👀 Check if token is valid')
  const token = req.body.headers.Authorization?.split(" ")[1] as string;
  let isUserValid;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    isUserValid = true;
  } catch (e) {
    isUserValid = false;
  }
  res.status(200).json(isUserValid)
}
