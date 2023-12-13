import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../../middlewares/errors/ApiError';
import ordersService from '../../services/ordersService';

export const getAllUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId
  const ordersList = await ordersService.getUserOrders(userId);
  console.log('ordersList:', ordersList)
  if (ordersList.length < 1) {
    next(ApiError.resourceNotFound('Orders not found'));
    return;
  }
  res.status(200).json(ordersList);
};
