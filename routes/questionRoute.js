import express from "express";
import questionController from "../controllers/questionController.js";

const questionRoutes = express.Router();

// public routes
questionRoutes.get("/getAllQuestions", questionController.getAllQuestions);
questionRoutes.get("/search", questionController.searchQuestions);
questionRoutes.get("/:id", questionController.getQuestionById);

// private routes
questionRoutes.post("/", questionController.createQuestion);
questionRoutes.put("/:id", questionController.updateQuestion);
questionRoutes.delete("/:id", questionController.deleteQuestion);

export default questionRoutes;