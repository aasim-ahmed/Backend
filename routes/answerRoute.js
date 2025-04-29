import express from "express";
import answerController from "../controllers/answerController.js";
const answerRoutes = express.Router();  

answerRoutes.post("/", answerController.submitAnswer);
answerRoutes.get("/", answerController.getAnswers);
answerRoutes.get("/:id", answerController.getAnswer);
answerRoutes.put("/:id", answerController.updateAnswer);
answerRoutes.delete("/:id", answerController.deleteAnswer);

export default answerRoutes;
