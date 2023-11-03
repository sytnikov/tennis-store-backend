import { NextFunction, Request, Response } from 'express';

import ordersService from '../../services/ordersService';
import { ApiError } from '../../middlewares/errors/ApiError';

export const deleteOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = Number(req.params.id);
  const foundIndex = ordersService.removeOrder(orderId);

  if (foundIndex !== -1) {
    res.status(200).json({ message: 'Order deleted successfully' });
    return;
  }
  next(ApiError.resourceNotFound('Order is not found'));
};
