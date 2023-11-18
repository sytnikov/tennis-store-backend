import mongoose from "mongoose";

import ShipmentRepo from "../models/ShipmentModel";
import OrderRepo from "../models/OrderModel";
import UserRepo from "../models/UserModel";
import { Shipment, shipmentUpdate } from "../types/Shipment";

async function findAll() {
    const shipments = await ShipmentRepo.find().exec();
    return shipments;
}

async function getOneShipment(index: string){
    const id = new mongoose.Types.ObjectId(index)
    const existedShipment = await ShipmentRepo.findById(id);
    return existedShipment;
}

async function createShipment(shipment: Shipment) {
    const { userId, orderId, address, shippingPrice } = shipment;
    const user = await UserRepo.findById(userId);
    
    if (!user) {
        return null;
    }

    const userOrders = await OrderRepo.find({ userId });
    const exisitngOrders = userOrders.filter((order) => 
        orderId.includes(order._id.toString())
    );

    const newShipment = await Promise.all(
        exisitngOrders.map(async (order) => {
            const existingShipment = await ShipmentRepo.findOne({
                userId,
                orderId: order._id,
            });
            if(!existingShipment){
                const createShipment = new ShipmentRepo({
                    userId,
                    orderId: order._id,
                    address,
                    shippingPrice,
                });
                await createShipment.save();
                await OrderRepo.findByIdAndUpdate(
                    { _id: order._id },
                    { shipmentId: createShipment._id,
                        status: "completed" }
                );
                return createShipment;
            }
        })
    );
    return newShipment.filter(Boolean);
}

async function updateShipment(index: string, shipment: shipmentUpdate) {
    const updatedShipment = await ShipmentRepo.findByIdAndUpdate(
        { _id: index },
        shipment,
        { new: true }
    );
    return updatedShipment;
}

async function deleteShipment(index: string) {
    const deletedShipment = await ShipmentRepo.findOneAndDelete(
        { _id: index });
    return deletedShipment;
}

export default {
    findAll,
    getOneShipment,
    createShipment,
    updateShipment,
    deleteShipment
};