import express from "express";
import questionController from "../controllers/questionController.js";
import auth from "../middleware/authMiddleware.js";

const questionRoutes = express.Router();

// public routes
questionRoutes.get("/getAllQuestions", questionController.getAllQuestions);
questionRoutes.get("/search", questionController.searchQuestions);
questionRoutes.get("/:id", questionController.getQuestionById);

// private routes
questionRoutes.post("/", auth, questionController.createQuestion);
questionRoutes.put("/:id",auth, questionController.updateQuestion);
questionRoutes.delete("/:id",auth, questionController.deleteQuestion);

export default questionRoutes;