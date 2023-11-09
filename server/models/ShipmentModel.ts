import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
        orderId: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order",
            }
        ],
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["pending", "shipped", "delivered"],
            default: "pending",
        },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Shipment", ShipmentSchema);
