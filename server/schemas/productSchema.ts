import { z } from "zod";

export const productSchema = z
  .object({
    body: z.object({
      name: z.string({
        required_error: "Name is required",
      }),
      description: z.string({
        required_error: "Description is required",
      }),
      price: z.number({
        required_error: "Price is required",
      }),
      categoryId: z.number({
        required_error: "CategoryId is required",
      }),
      images: z.array(
        z.string({
          required_error: "Images are required",
        })
      ),
    }).strict(),
  })


export const uptadeProductSchema = z
  .object({
    body: z.object({
      name: z.string().optional(),
      price: z.number().optional(),
      description: z.string().optional(),
      images: z.array(z.string()).optional(),
    }).strict(),
  })
