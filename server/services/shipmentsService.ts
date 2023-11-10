import mongoose from "mongoose";
import ShipmentRepo from "../models/ShipmentModel";

async function findAll() {
    const shipments = await ShipmentRepo.find().exec();
    return shipments;
}

async function getOneShipment(index: string){
    const id = new mongoose.Types.ObjectId(index)
    const existedShipment = await ShipmentRepo.findById(id).exec();
    return existedShipment;
}

async function createShipment(shipment: any) {
    const newShipment = new ShipmentRepo(shipment);
    await newShipment.save();
    return newShipment;
}

async function updateShipment(shipment: any) {
    const updatedShipment = await ShipmentRepo.findByIdAndUpdate(
        {
            _id: shipment.id,
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