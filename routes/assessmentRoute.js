import express from "express";
import assessmentController from "../controllers/assessmentController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get('/', assessmentController.getAllAssessments);
router.get('/:id', assessmentController.getAssessmentById);

// Protected routes
router.post('/', auth, assessmentController.createAssessment);
router.put('/:id', auth, assessmentController.updateAssessment);
router.delete('/:id', auth, assessmentController.deleteAssessment);

// Clone an assessment (e.g. for reuse by other users)
router.post('/:id/clone', auth, assessmentController.cloneAssessment);

export default router;