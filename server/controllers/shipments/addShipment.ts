import { Request, Response, NextFunction } from 'express';

import shipmentsService from '../../services/shipmentsService';
import { ApiError } from '../../middlewares/errors/ApiError';

export async function addShipment(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        try {
            const newShipment = req.body;
            const shipment = await shipmentsService.createShipment(newShipment);
            if (!shipment) {
                return next(ApiError.resourceNotFound("Cannot add Shipment there's somthing wrong with the data"));
            }
            res.status(201).json({shipment, message: "Shipment created"});
        } catch (error) {
            next(ApiError.resourceNotFound("Cannot add Shipment"));
        }
}