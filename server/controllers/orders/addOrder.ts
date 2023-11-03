import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import ordersService from '../../services/ordersService';

export const addOrder = (req: Request, res: Response, next: NextFunction) => {
  const newOrder = req.body;
  const order = ordersService.createOrder(newOrder);

  if (newOrder) {
    res.status(201).json(order);
  }
  next(ApiError.resourceNotFound('Order not found'));
};
