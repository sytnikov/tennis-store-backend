import { z } from "zod";

import { userSchema } from "../schemas/userSchema";

export type User = z.infer<typeof userSchema>;

export type UserUpdate = Omit<Partial<User>, "id">;