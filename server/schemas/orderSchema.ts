import { z } from 'zod';

export const orderBodySchema = z.object({
  userId: z.string(),
  // totalAmount: z.number()
});

export const orderSchema = z.object({
  body: orderBodySchema,
});
