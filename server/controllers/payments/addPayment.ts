import { NextFunction, Request, Response } from "express";

import PaymentRepo from "../../models/PaymentModel";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 123,
  },
  {
    id: 2,
    name: "Product 2",
    price: 123,
  },
];


export const addPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
};
