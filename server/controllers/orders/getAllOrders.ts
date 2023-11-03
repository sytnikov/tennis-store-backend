import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import ordersService from '../../services/ordersService';

export const getAllOrders = (_: Request, res: Response, next: NextFunction) => {
  const ordersList = ordersService.getOrders();
  if (ordersList) {
    res.status(200).json(ordersList);
    return;
  }
  next(ApiError.resourceNotFound('Order not found'));
};
