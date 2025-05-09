import AssessmentReview from "../models/Review.js";

const reviewController = {
     submitReview : async (req, res) => {
        try {
          const { assessment, candidateEmail, rating, feedback } = req.body;
      
          if (!assessment || !candidateEmail || !rating) {
            return res.status(400).json({ error: 'Assessment, email, and rating are required' });
          }
      
          const existing = await AssessmentReview.findOne({ assessment, candidateEmail });
          if (existing) {
            return res.status(409).json({ error: 'Review already submitted for this assessment' });
          }
      
          const review = new AssessmentReview({
            assessment,
            candidateEmail,
            rating,
            feedback,
          });
      
          await review.save();
      
          res.status(201).json({ message: 'Review submitted successfully', review });
        } catch (err) {
          res.status(500).json({ error: 'Failed to submit review', details: err.message });
        }
      },
      
      // Get all reviews (recruiter/admin access)
       getAllReviews : async (req, res) => {
        try {
          const filters = {};
          const { assessment, rating, fromDate, toDate } = req.query;
      
          if (assessment) filters.assessment = assessment;
          if (rating) filters.rating = rating;
          if (fromDate || toDate) {
            filters.createdAt = {};
            if (fromDate) filters.createdAt.$gte = new Date(fromDate);
            if (toDate) filters.createdAt.$lte = new Date(toDate);
          }
      
          const reviews = await AssessmentReview.find(filters).populate('assessment');
      
          res.json({ reviews });
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch reviews', details: err.message });
        }
      },
      
      // Get single review by ID
       getReviewById : async (req, res) => {
        try {
          const review = await AssessmentReview.findById(req.params.id).populate('assessment');
          if (!review) return res.status(404).json({ error: 'Review not found' });
      
          res.json({ review });
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch review', details: err.message });
        }
      },
      
      // Delete review
       deleteReview : async (req, res) => {
        try {
          const deleted = await AssessmentReview.findByIdAndDelete(req.params.id);
          if (!deleted) return res.status(404).json({ error: 'Review not found' });
      
          res.json({ message: 'Review deleted successfully' });
        } catch (err) {
          res.status(500).json({ error: 'Failed to delete review', details: err.message });
        }
      }

}

export default reviewController