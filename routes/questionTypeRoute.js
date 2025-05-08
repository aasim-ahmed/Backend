import express from "express";
import questionTypeController from "../controllers/questionTypeController.js";
import auth from "../middleware/authMiddleware.js";

const questionTypeRoutes = express.Router();

// public routes
questionTypeRoutes.get("/getAllQuestionTypes", questionTypeController.getAllQuestionTypes);
questionTypeRoutes.get("/search", questionTypeController.searchQuestionTypes);
questionTypeRoutes.get("/getQuestionType/:id", questionTypeController.getQuestionType);


// Protected routes
questionTypeRoutes.put("/updateQuestionType/:id",auth, questionTypeController.updateQuestionType);
questionTypeRoutes.post("/createQuestionType",auth, questionTypeController.createQuestionType);
questionTypeRoutes.delete("/deleteQuestionType/:id",auth, questionTypeController.deleteQuestionType);
export default questionTypeRoutes;