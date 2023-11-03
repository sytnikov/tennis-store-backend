import { z } from 'zod';

export const orderSchema = z
  .object({
    id: z.number(),
    products: z.array(
      z.object({
        productId: z.number(),
        quantity: z.number().int().min(1, 'Quantity is required'),
      })
    ),
  })
  .strict();
