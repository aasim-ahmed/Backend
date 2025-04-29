import express from "express";
import questionTypeController from "../controllers/questionTypeController.js";

const questionTypeRoutes = express.Router();

questionTypeRoutes.post("/createQuestionType", questionTypeController.createQuestionType);
questionTypeRoutes.get("/getAllQuestionTypes", questionTypeController.getAllQuestionTypes);
questionTypeRoutes.get("/getQuestionType/:id", questionTypeController.getQuestionType);
questionTypeRoutes.put("/updateQuestionType/:id", questionTypeController.updateQuestionType);
questionTypeRoutes.delete("/deleteQuestionType/:id", questionTypeController.deleteQuestionType);

export default questionTypeRoutes;