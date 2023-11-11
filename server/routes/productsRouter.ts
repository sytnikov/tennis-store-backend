import express from "express";

import ctrl from "../controllers/products";
import { validate } from "../middlewares/validate";
import { productSchema, uptadeProductSchema } from "../schemas/productSchema";
import { controlWrapper } from "../middlewares/controlWrapper";

const router = express.Router();
router.get("/", controlWrapper(ctrl.getAllProducts));
router.get("/:productId", controlWrapper(ctrl.getProduct));
router.post("/", validate(productSchema), controlWrapper(ctrl.addProduct));
router.delete("/:productId", controlWrapper(ctrl.deleteProduct));
router.put(
  "/:productId",
  validate(uptadeProductSchema),
  controlWrapper(ctrl.updateProduct)
);

export default router;
