import { Request, Response, NextFunction } from "express";

import shipmentsService from '../../services/shipmentsService';
import { ApiError } from '../../middlewares/errors/ApiError';

export async function getOneShipment(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const id = req.params.shipmentId;
        const isShipmentExisted = await shipmentsService.getOne(id);
        if (!isShipmentExisted){
            next(ApiError.resourceNotFound("Shipment not found"));
            return;
        }
        res.status(200).json({ isShipmentExisted });
    } catch (error) {
        next(ApiError.resourceNotFound("Cannot find Shipment"));

    }
}