import express from "express";
import questionTypeController from "../controllers/questionTypeController.js";

const questionTypeRoutes = express.Router();

// public routes
questionTypeRoutes.get("/getAllQuestionTypes", questionTypeController.getAllQuestionTypes);
questionTypeRoutes.get("/search", questionTypeController.searchQuestionTypes);
questionTypeRoutes.get("/getQuestionType/:id", questionTypeController.getQuestionType);


// Protected routes
questionTypeRoutes.put("/updateQuestionType/:id", questionTypeController.updateQuestionType);
questionTypeRoutes.post("/createQuestionType", questionTypeController.createQuestionType);
questionTypeRoutes.delete("/deleteQuestionType/:id", questionTypeController.deleteQuestionType);
export default questionTypeRoutes;