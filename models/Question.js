import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  isRightAnswer: {
    type: Boolean,
    default: false,
  },
});

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    questionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionType',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    options: [optionSchema], // Embedded options array
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    instruction: {
      type: String,
      default: '',
    },
    isMultiSelect: {
      type: Boolean,
      default: false, // true for multi-select questions
    },
    isLibrary: {
      type: Boolean,
      default: false, // if part of library
    },
  },
  {
    timestamps: true,
  }
);
const Question = mongoose.model('Question', questionSchema);

export default Question;
