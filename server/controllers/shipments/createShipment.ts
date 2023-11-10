import { Request, Response, NextFunction } from 'express';

import shipmentsService from '../../services/shipmentsService';
import { ApiError } from '../../middlewares/errors/ApiError';

export function createShipment(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        try {
            const shipment = shipmentsService.createShipment(req.body);
            res.status(201).json({shipment, message: "Shipment created"});
        } catch (error) {
            next(ApiError.resourceNotFound("Cannot add Shipment"));
        }
}