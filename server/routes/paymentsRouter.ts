import express from "express";

import ctrl from "../controllers/payments";
import { validate } from "../middlewares/validate";
import { paymentSchema } from "../schemas/paymentSchema";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();
router.get("/", ctrl.getAllPayments);
router.post("/", checkAuth, validate(paymentSchema), ctrl.addPayment);
router.get("/:paymentId", ctrl.getPayment);
router.delete("/:paymentId", ctrl.removePayment);

export default router;
