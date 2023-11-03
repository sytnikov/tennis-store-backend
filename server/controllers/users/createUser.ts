import { NextFunction, Request, Response } from "express";

import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";

export function createUser(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        const newUserData = req.body;
        if (newUserData !== undefined && newUserData !== null) {
            const newUser = usersService.createUser(newUserData);
            res.status(200).json(newUser);
        } else {
            next(ApiError.badRequest("User can't be created"));
            return;
        }
}