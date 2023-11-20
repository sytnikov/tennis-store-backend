import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";


export async function googleLogIn (req: any, res: Response, next: NextFunction)  {
  const user = req.user;
  if (user) {
    const payload = {
    //   userId: user._id,
    //   email: user.email,
    //   role: user.role,
    };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({
      accessToken,
    });
  }
}
