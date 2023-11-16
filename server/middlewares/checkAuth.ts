import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from './errors/ApiError';
import { DecodedUser, WithAuthRequest } from '../types/Auth';

export function checkAuth(
  req: WithAuthRequest,
  _: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    next(ApiError.forbidden('Token is missing'));
    return;
  }

  const decode = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string
  ) as DecodedUser;

  req.decoded = decode;
  next();
}


