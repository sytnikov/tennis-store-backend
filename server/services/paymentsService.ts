import OrderRepo from "../models/OrderModel";
import PaymentRepo from "../models/PaymentModel";
import UserRepo from "../models/UserModel";
import { Payment } from "../types/Payment";

const createOne = async (newPayment: Payment) => {
  const { userId, ordersId, method } = newPayment;
  const user = await UserRepo.findById(userId);
  if (!user) {
    return null;
  }
  const userOrders = await OrderRepo.find({ userId });
  const existingOrders = userOrders.filter((order) =>
    ordersId.includes(order._id.toString())
  );
  const createdPayments = await Promise.all(
    existingOrders.map(async (order) => {
      const existingPayment = await PaymentRepo.findOne({
        userId,
        orderId: order._id,
      });
      if (!existingPayment) {
        const createdPayment = new PaymentRepo({
          userId,
          method,
          orderId: order._id,
          status: "completed",
        });
        await createdPayment.save();
        await OrderRepo.findByIdAndUpdate(order._id, {
          paymentStatus: "success",
          paymentId: createdPayment._id,
        });
        return createdPayment;
      }
    })
  );
  return createdPayments.filter(Boolean);
};

const removeOne = async (paymentId: string) => {
  return await PaymentRepo.findByIdAndDelete(paymentId);
};

const findOne = async (paymentId: string) => {
  return await PaymentRepo.findById(paymentId);
};

const findAll = async () => {
  return await PaymentRepo.find().exec();
};
export default { createOne, removeOne, findOne, findAll };
