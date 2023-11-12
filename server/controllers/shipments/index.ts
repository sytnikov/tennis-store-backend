import { createShipment } from "./createShipment";
import { getAllShipments } from "./getAllShipments";
import { getOneShipment } from "./getOneShipment";
import { updateShipment } from "./updateShipment";
import { deleteShipment } from "./deleteShipment";

export const shipmentsController = {
    createShipment,
    getAllShipments,
    getOneShipment,
    updateShipment,
    deleteShipment
}