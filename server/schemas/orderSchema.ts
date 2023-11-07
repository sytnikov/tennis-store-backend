import { z } from 'zod';

export const orderBodySchema = z.object({
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().int().min(1, 'Quantity is required'),
    })
  ),
});

export const orderSchema = z.object({
  body: orderBodySchema,
});
