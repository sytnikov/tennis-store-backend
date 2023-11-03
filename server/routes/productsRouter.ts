import express from "express";

import ctrl from "../controllers/products";
import { validate } from "../middlewares/validate";
import { productSchema, uptadeProductSchema } from "../schemas/productSchema";

const router = express.Router();
router.get("/", ctrl.getAllProducts); 
router.get("/:id", ctrl.getProduct);
router.post("/", validate(productSchema), ctrl.addProduct);
router.delete("/:id", ctrl.deleteProduct);
router.put("/:id", validate(uptadeProductSchema), ctrl.updateProduct);

export default router;
