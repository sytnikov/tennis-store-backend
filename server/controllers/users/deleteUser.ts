import { NextFunction, Request, Response } from "express";

import usersService from "../../services/usersService";
import { ApiError } from "../../middlewares/errors/ApiError";

export function deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        const id = Number(req.params.userId);
        const usersData = usersService.getSingleUser(id);
        if (usersData) {
            next(ApiError.resourceNotFound("User can't be deleted"));
            return;
        }
        usersService.deleteUser(id);
        res.status(200).json({ message: "User deleted" });
}

