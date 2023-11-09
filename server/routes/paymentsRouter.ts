import express from "express";

import ctrl from "../controllers/payments";

const router = express.Router();
router.post("/", (ctrl.addPayment));
router.get("/:id", ctrl.getPayment);
router.delete("/:id", ctrl.removePayment);


export default router;
