import { z } from "zod";
export const productSchema = z.object({
    id: z.number(),
    name: z.string({
        required_error: "Name is required",
    }),
    image: z.string({
        required_error: "Image is required",
    }),
});
export const requestSchema = z.object({
    body: productSchema,
});
