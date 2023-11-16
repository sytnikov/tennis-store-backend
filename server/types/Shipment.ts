import { z } from "zod";

import { shipmentBodySchema } from "../schemas/shipmentSchema";
import mongoose from "mongoose";

export type Shipment = z.infer<typeof shipmentBodySchema> & {
    _id: mongoose.Types.ObjectId;
    status: 'Pending' | 'Shipped' | 'Delivered';
    createdAt: Date;
    updatedAt: Date;
};

export type shipmentUpdate = Partial<Shipment>;