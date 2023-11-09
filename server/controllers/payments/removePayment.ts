import { NextFunction, Request, Response } from "express";

import PaymentRepo from "../../models/PaymentModel";
import mongoose from "mongoose";

export const removePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    orderId,
    method,
  }: {
    userId: mongoose.Types.ObjectId;
    orderId: mongoose.Types.ObjectId;
    method: string;
    status: string;
  } = req.body;
  const payment = new PaymentRepo({
    userId,
    orderId,
    status: "pending",
    method,
  });
  await payment.save();

  res.status(201).json({ message: "Payment is created", payment });
};
