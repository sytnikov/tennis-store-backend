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
        shippingAddress: {
            type: String,
            required: true,
        },
        shippingCity: {
            type: String,
            required: true,
        },
        shippingState: {
            type: String,
            required: true,
        },
        shippingZip: {
            type: String,
            required: true,
        },
        shippingCountry: {
            type: String,
            required: true,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        paymentId: {
            type: Schema.Types.ObjectId,
            ref: "Payment",
        },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Shipment", ShipmentSchema);
