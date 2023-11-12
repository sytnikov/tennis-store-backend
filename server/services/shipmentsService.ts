import mongoose from "mongoose";
import ShipmentRepo from "../models/ShipmentModel";
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
    const newShipment = new ShipmentRepo(shipment);
    await newShipment.save();
    return newShipment;
}

async function updateShipment(index: string, shipment: shipmentUpdate) {
    const updatedShipment = await ShipmentRepo.findByIdAndUpdate(
        {
            _id: index,
        },
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