import mongoose from "mongoose";
import { z } from "zod";

export const paymentBodySchema = z
  .object({
    userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
    method: z.enum(["credit_card", "bank_transfer", "paypal"]),
    ordersId: z.array(
      z.string().refine((val) => mongoose.Types.ObjectId.isValid(val))
    ),
  })
  .strict();


export const paymentSchema = z.object({
  body: paymentBodySchema,
});
