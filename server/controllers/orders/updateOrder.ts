import { NextFunction, Request, Response } from 'express';

import ordersService from '../../services/ordersService';
import { ApiError } from '../../middlewares/errors/ApiError';

export const updateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = Number(req.params.id);
  const updatedOrder = req.body;

  const order = ordersService.updateOrder(orderId, updatedOrder);

  if (order) {
    res.status(200).json(order);
    return;
  }
  next(ApiError.resourceNotFound('Order not found'));
};
