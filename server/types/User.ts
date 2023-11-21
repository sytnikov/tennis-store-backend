import { z } from "zod";

import { userBodySchema } from "../schemas/userSchema";
import mongoose from "mongoose";

export type User = z.infer<typeof userBodySchema> & {
  _id: mongoose.Types.ObjectId;
};;

export type UserUpdate = Partial<User>;