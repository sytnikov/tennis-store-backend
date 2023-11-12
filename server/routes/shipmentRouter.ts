import Express from "express";

import shipmentsController from "../controllers/shipments";
import { validate } from "../middlewares/validate";
import { shipmentSchema } from "../schemas/shipmentSchema";

const shipmentsRouter = Express.Router();

shipmentsRouter.get("/", shipmentsController.getAllShipments);
shipmentsRouter.get("/:shipmentId", shipmentsController.getAllShipments);
shipmentsRouter.post("/", validate(shipmentSchema), shipmentsController.addShipment);
shipmentsRouter.put("/:shipmentId", validate(shipmentSchema), shipmentsController.updateShipment);
shipmentsRouter.delete("/:shipmentId", shipmentsController.deleteShipment);

export default shipmentsRouter;