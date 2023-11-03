import { Order } from '../types/Order';
import { OrderRepo } from '../models/OrderModel';

const ordersRepo = new OrderRepo();

function getOrders() {
  const orders = ordersRepo.getAll();
  return orders;
}

function getSingleOrder(orderId: number) {
  const order = ordersRepo.getSingle(orderId);
  return order;
}

function createOrder(createData: Order) {
  const newOrder = ordersRepo.createOrder(createData);
  return newOrder;
}

function removeOrder(orderId: number) {
  const foundIndex = ordersRepo.deleteOrder(orderId);
  return foundIndex;
}

function updateOrder(orderId: number, updatedOrder: Order) {
  const foundIndex = ordersRepo.updateOrder(orderId, updatedOrder);
  return foundIndex;
}

export default {
  getOrders,
  getSingleOrder,
  createOrder,
  removeOrder,
  updateOrder,
};
