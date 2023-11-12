import { z } from "zod";

import { shipmentSchema } from "../schemas/shipmentSchema";
import mongoose from "mongoose";

export type Shipment = z.infer<typeof shipmentSchema> & {
    _id: mongoose.Types.ObjectId;
    status: 'Pending' | 'Shipped' | 'Delivered';
    createdAt: Date;
    updatedAt: Date;
};