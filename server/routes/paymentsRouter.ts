import express from "express";

import ctrl from "../controllers/payments";
import { validate } from "../middlewares/validate";
import { paymentSchema } from "../schemas/paymentSchema";

const router = express.Router();
router.get("/", ctrl.getAllPayments);
router.post("/", validate(paymentSchema), (ctrl.addPayment));
router.get("/:id", ctrl.getPayment);
router.delete("/:id", ctrl.removePayment);


export default router;
