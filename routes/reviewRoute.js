import express from "express";
import reviewController from "../controllers/reviewController.js";
import auth from "../middleware/authMiddleware.js"

const reviewRoutes = express.Router();

// Submit a review (after completing assessment)
reviewRoutes.post('/', reviewController.submitReview);

// Get all reviews (with filters by assessment, rating, time)
reviewRoutes.get('/', auth, reviewController.getAllReviews);

// Get single review by ID
reviewRoutes.get('/:id', auth, reviewController.getReviewById);

// Delete review (admin/recruiter only)
reviewRoutes.delete('/:id', auth, reviewController.deleteReview);

export default reviewRoutes;
