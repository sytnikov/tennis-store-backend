import { Order, OrderDto, UpdateOrderInput } from '../types/Order';
import OrderRepo from '../models/OrderModel';
import mongoose from 'mongoose';

const getOrders = async () => {
  return await OrderRepo.find().exec();
};

const getSingleOrder = async (orderId: string) => {
  const id = new mongoose.Types.ObjectId(orderId);
  return await OrderRepo.findOne({ _id: id }).exec();
};

const createOrder = async (createData: OrderDto) => {
  const newOrder = new OrderRepo(createData);
  return await newOrder.save();
}

const updateOrder = async(orderId: string, updateOrder: UpdateOrderInput) => {
  const id = new mongoose.Types.ObjectId(orderId);
  return await OrderRepo.findByIdAndUpdate(id, updateOrder, {new: true});
}
const removeOrder = async (orderId: string) => {
  const id = new mongoose.Types.ObjectId(orderId);
  return await OrderRepo.findByIdAndDelete(id);
};

export default {
  getOrders,
  getSingleOrder,
  createOrder,
  removeOrder,
  updateOrder,
};
