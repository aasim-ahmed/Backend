import express from "express";
import assessmentController from "../controllers/assessmentController.js";

const assessmentRoutes = express.Router();

assessmentRoutes.post("/createAssessment", assessmentController.createAssessment);
assessmentRoutes.get("/getAllAssessments", assessmentController.getAllAssessments);
assessmentRoutes.get("/getAssessment/:id", assessmentController.getAssessment);
assessmentRoutes.put("/updateAssessment/:id", assessmentController.updateAssessment);
assessmentRoutes.delete("/deleteAssessment/:id", assessmentController.deleteAssessment);

export default assessmentRoutes;