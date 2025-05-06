import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      }
    ],
    time_limit: {
      type: Number,
      default: 60 // in minutes
    },
    passing_score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true
  }
);

// Indexes for faster queries (optional)
assessmentSchema.index({ name: 1 });
assessmentSchema.index({ passing_score: 1 });

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;
