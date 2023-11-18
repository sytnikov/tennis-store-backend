import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
        address: {
            type: String,
            required: true,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Shipment", ShipmentSchema);
