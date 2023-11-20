import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { Role } from "../utils/role";

export interface DecodedUser extends JwtPayload {
  userId: string;
  email: string;
}

export interface WithAuthRequest extends Request {
  decoded?: DecodedUser;
}

export type User = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
