import express from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/", categoryController.createCategory);
categoryRoutes.get("/", categoryController.getAllCategories);
categoryRoutes.get("/hierarchy", categoryController.getCategoryHierarchy);
categoryRoutes.get("/:id", categoryController.getCategory);
categoryRoutes.put("/:id", categoryController.updateCategory);
categoryRoutes.delete("/:id", categoryController.deleteCategory);

export default categoryRoutes;