import { Request, Response, NextFunction } from 'express';

import shipmentsService from '../../services/shipmentsService';
import { ApiError } from '../../middlewares/errors/ApiError';

export async function deleteShipment(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        const id = req.params.shipmentId;
        const shipmentsData = await shipmentsService.getOne(id);
        if (!shipmentsData || shipmentsData === undefined) {
            next(ApiError.resourceNotFound("Shipment can't be deleted"));
            return;
        }
        await shipmentsService.deleteShipment(id);
        res.status(200).json({ message: "Shipment deleted" });
}