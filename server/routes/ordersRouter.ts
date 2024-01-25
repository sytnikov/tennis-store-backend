import { Router } from 'express';
import { getAllOrders } from '../controllers/orders/getAllOrders';
import { getAllUserOrders } from '../controllers/orders/getAllUserOrders';
import { getSingleOrder } from '../controllers/orders/getSingleOrder';
import { deleteOrder } from '../controllers/orders/deleteOrder';
import { addOrder } from '../controllers/orders/addOrder';
import { updateOrder } from '../controllers/orders/updateOrder';
import { validate } from '../middlewares/validate';
import { orderSchema } from '../schemas/orderSchema';
import { checkAuth } from '../middlewares/checkAuth';

const ordersRouter = Router();

ordersRouter.get('/', checkAuth, getAllOrders);
ordersRouter.get('/:userId', checkAuth, getAllUserOrders);
ordersRouter.get('/:orderId', checkAuth, getSingleOrder);
ordersRouter.post('/', checkAuth, validate(orderSchema), addOrder);
ordersRouter.patch("/:orderId", checkAuth, validate(orderSchema), updateOrder);
ordersRouter.delete("/:orderId", checkAuth, deleteOrder);

export default ordersRouter;
