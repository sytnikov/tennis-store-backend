import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import ordersService from '../../services/ordersService';

export const getSingleOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = Number(req.params.id);
  const order = ordersService.getSingleOrder(orderId);

  if (order) {
    res.status(200).json(order);
    return;
  }
  next(ApiError.resourceNotFound('Order not found'));
};
