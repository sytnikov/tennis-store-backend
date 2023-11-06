import express from "express";

import controller from "../controllers/categories"
import { validate } from "../middlewares/validate";
import { categorySchema } from "../schemas/categorySchema";

const categoriesRouter = express.Router();

categoriesRouter.get("/", controller.getAllCategories);
categoriesRouter.get("/:categoryId", controller.getSingleCategory);
categoriesRouter.post("/", validate(categorySchema), controller.createCategory)
categoriesRouter.put("/:categoryId", validate(categorySchema), controller.updateCategory)
categoriesRouter.delete("/:categoryId", controller.deleteCategory)

export default categoriesRouter