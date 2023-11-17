export const ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;


export type Role = keyof typeof ROLE;