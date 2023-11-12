import { Request, Response, NextFunction } from 'express';

import shipmentsService from '../../services/shipmentsService';
import { ApiError } from '../../middlewares/errors/ApiError';

export async function updateShipment(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const id = req.params.shipmentId;
        const updatedShipment = req.body;
        const shipment = shipmentsService.updateShipment(id, updatedShipment);
        
    } catch (error) {
        next(ApiError.resourceNotFound("Cannot find Shipment"));

    }
}