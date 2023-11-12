import mongoose from "mongoose";
import { z } from "zod";

export const shipmentBodySchema = z.object({
    userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
    orderId: z.array(z.string().refine((val) => mongoose.Types.ObjectId.isValid(val))),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    shippingPrice: z.number(),
    status: z.enum(['Pending', 'Shipped', 'Delivered'])
}).strict();

export const shipmentSchema = z.object({
    body: shipmentBodySchema,
});