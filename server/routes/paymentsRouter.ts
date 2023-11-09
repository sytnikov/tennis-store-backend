import express from "express";

import ctrl from "../controllers/payments";

const router = express.Router();
router.post("/", (ctrl.addPayment));

export default router;
