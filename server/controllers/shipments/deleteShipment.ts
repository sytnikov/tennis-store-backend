import { Request, Response, NextFunction } from 'express';

import shipmentsService from '../../services/shipmentsService';
import { ApiError } from '../../middlewares/errors/ApiError';

export function deleteShipment(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        const id = req.params.shipmentId;
        const shipmentsData = shipmentsService.getOneShipment(id);
        if (!shipmentsData) {
            next(ApiError.resourceNotFound("Shipment can't be deleted"));
            return;
        }
        shipmentsService.deleteShipment(id);
        res.status(200).json({ message: "Shipment deleted" });
}