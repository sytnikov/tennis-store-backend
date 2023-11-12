import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import ShipmentsService from '../../services/shipmentsService';

export async function getAllShipments(
    _: Request,
    res: Response,
    next: NextFunction
    ) {
    try {
        const shipments = await ShipmentsService.findAll();
        if (!shipments || shipments === undefined) {
            next(ApiError.resourceNotFound("Shipments not found"));
            return;
        }
        res.status(200).json({ shipments });
    } catch (error) {
        next(ApiError.resourceNotFound("Shipment not found"));
    }
}