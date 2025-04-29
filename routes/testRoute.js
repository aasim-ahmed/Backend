import express from "express";
import testController from "../controllers/testController.js";

const testRoutes = express.Router();

// CRUD operations for tests
testRoutes.post("/", testController.createTest);
testRoutes.get("/", testController.getTests);
testRoutes.get("/:id", testController.getTestById);
testRoutes.put("/:id", testController.updateTest);
testRoutes.delete("/:id", testController.deleteTest);

export default testRoutes;