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
        const shipment = await shipmentsService.updateShipment(id, updatedShipment);
        if (!shipment || shipment === undefined){
            next(ApiError.resourceNotFound("Shipment not found"));
            return;
        }
        res.status(200).json({ shipment, message: "Shipment updated" });
    } catch (error) {
        next(ApiError.resourceNotFound("Cannot find Shipment"));

    }
}