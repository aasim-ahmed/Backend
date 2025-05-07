import express from "express";
import testController from "../controllers/testController.js";
import auth from "../middleware/authMiddleware.js";

const testRoutes = express.Router();

// Public or optional
router.get('/', testController.getAllTests);
router.get('/:id', testController.getTestById);

// Protected routes
router.post('/', auth, testController.createTest);
router.put('/:id', auth, testController.updateTest);
router.delete('/:id', auth, testController.deleteTest);

// Add/Remove questions to a test (optional feature)
router.post('/:id/questions', auth, testController.addQuestionsToTest);
router.delete('/:id/questions/:questionId', auth, testController.removeQuestionFromTest);

export default testRoutes;