import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import usersService from '../../services/usersService';

export function updateUser(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        const id = Number(req.params.userId);
        const updatedData = req.body;
        const updatedUser = usersService.updateUser(id, updatedData);
        if (!updatedUser) {
            next(ApiError.resourceNotFound("User can't be updated"));
            return;
        }
        
        res.status(200).json(updatedUser);
}