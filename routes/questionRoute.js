import express from "express";
import questionController from "../controllers/questionController.js";

const questionRoutes = express.Router();

questionRoutes.post("/", questionController.createQuestion);
questionRoutes.get("/getAllQuestions", questionController.getAllQuestions);
questionRoutes.get("/:id", questionController.getQuestion);
questionRoutes.put("/:id", questionController.updateQuestion);
questionRoutes.delete("/:id", questionController.deleteQuestion);

export default questionRoutes;