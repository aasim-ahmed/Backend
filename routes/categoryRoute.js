import express from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/createCategory", categoryController.createCategory);
categoryRoutes.get("/allcategories", categoryController.getAllCategories);
categoryRoutes.get("/hierarchy", categoryController.getCategoryHierarchy);
categoryRoutes.get("/:id", categoryController.getCategory);
categoryRoutes.put("/updateCategory/:id", categoryController.updateCategory);
categoryRoutes.delete("/deleteCategory/:id", categoryController.deleteCategory);

export default categoryRoutes;