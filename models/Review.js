import mongoose from "mongoose";

const assessmentReviewSchema = new mongoose.Schema(
    {
      assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true,
      },
      candidateEmail: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
      },
      feedback: {
        type: String,
        default: '',
      },
    },
    {
      timestamps: true,
    }
  );
  
  const AssessmentReview = mongoose.model('AssessmentReview', assessmentReviewSchema);
  
  export default AssessmentReview;  