import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";

export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log('👀 Entered validate middleware')
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        console.log('errorMessages:', errorMessages)
        return res.status(400).json({errors: errorMessages});
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };
}
