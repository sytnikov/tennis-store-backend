import mongoose from 'mongoose';

import ProductRepo from "../models/ProductModel";
import OrderRepo from "../models/OrderModel";
import OrderItemRepo from "../models/OrderItemModel";
import { OrderDto, UpdateOrderInput, newOrderData } from '../types/Order';

const getOrders = async () => {
  return await OrderRepo.find().exec();
};

const getAllOrderItems = async () => {
  return await OrderItemRepo.find().exec();
}

const getSingleOrder = async (orderId: string) => {
  const id = new mongoose.Types.ObjectId(orderId);
  return await OrderRepo.findOne({ _id: id }).exec();
};

const addOrder = async (createData: OrderDto) => {
  const newOrder = new OrderRepo(createData);
  return await newOrder.save();
}

const createOrder = async (newOrderData: newOrderData) => {
  const userId = newOrderData.userId
  const products = newOrderData.products
  
  const productDocs = await Promise.all(
    products.map((product) => ProductRepo.findOne({ _id: product.productId }))
  );
  const totalAmount: number = productDocs.reduce(
    (total, productDoc, index) =>
      total + Number(productDoc?.price) * products[index].quantity || 0,
    0
  );
  const newOrder = new OrderRepo({userId, totalAmount});
  await newOrder.save();

  const orderId = newOrder._id;
  await Promise.all(
    products.map((product) => {
      const orderItem = new OrderItemRepo({
        orderId,
        productId: product.productId,
        quantity: product.quantity,
      });
      orderItem.save();
    })
  );
  return newOrder
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
  getAllOrderItems,
  getSingleOrder,
  addOrder,
  createOrder,
  removeOrder,
  updateOrder,
};
