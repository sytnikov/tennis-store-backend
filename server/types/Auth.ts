import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface DecodedUser extends JwtPayload {
  userId: string;
  email: string;
}

export interface WithAuthRequest extends Request {
  decoded?: DecodedUser;
}
