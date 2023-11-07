import { z } from "zod";

import { userSchema } from "../schemas/userSchema";
import mongoose from "mongoose";

export type User = z.infer<typeof userSchema>& {
    id: mongoose.Types.ObjectId;
};;

export type UserUpdate = Partial<User>;