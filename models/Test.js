import mongoose from 'mongoose';

const testSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      questions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
        },
      ],
      timePerSection: {
        type: Map,
        of: Number, // minutes
      },
      totalQuestions: {
        type: Number,
        default: 0,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      isLibraryTest: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const Test = mongoose.model('Test', testSchema);

export default Test;