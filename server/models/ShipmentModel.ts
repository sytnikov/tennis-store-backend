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
        address: {
            type: {
                city: {
                    type: String,
                    required: true,
                },
                postalCode: {
                    type: String,
                    required: true,
                },
                country: {
                    type: String,
                    required: true,
                },
            },
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
