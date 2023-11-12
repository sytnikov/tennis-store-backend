import { Request, Response, NextFunction } from 'express';

import shipmentsService from '../../services/shipmentsService';
import { ApiError } from '../../middlewares/errors/ApiError';

export async function addShipment(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        try {
            const shipment = await shipmentsService.createShipment(req.body);
            if (!shipment || shipment === undefined) {
                return next(ApiError.resourceNotFound("Cannot add Shipment"));
            }
            res.status(201).json({shipment, message: "Shipment created"});
        } catch (error) {
            next(ApiError.resourceNotFound("Cannot add Shipment"));
        }
}