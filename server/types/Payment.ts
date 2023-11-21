import { z } from "zod";
import { paymentBodySchema } from "../schemas/paymentSchema";
import mongoose from "mongoose";
import { Shipment } from "./Shipment";

export type Payment = z.infer<typeof paymentBodySchema> & Shipment & {
  _id: mongoose.Types.ObjectId;
  status: "pending" | "completed" | "failed";
};
