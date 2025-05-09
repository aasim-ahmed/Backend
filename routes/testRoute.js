import express from "express";
import testController from "../controllers/testController.js";
import auth from "../middleware/authMiddleware.js";

const testRoutes = express.Router();

// Public or optional
testRoutes.get('/', testController.getAllTests);
testRoutes.get('/:id', testController.getTestById);

// Protected routes
testRoutes.post('/createTest', auth, testController.createTest);
testRoutes.put('/:id', auth, testController.updateTest);
testRoutes.delete('/:id', auth, testController.deleteTest);

// Add/Remove questions to a test (optional feature)
testRoutes.post('/:id/questions', auth, testController.addQuestionsToTest);
testRoutes.delete('/:id/questions/:questionId', auth, testController.removeQuestionFromTest);

export default testRoutes;