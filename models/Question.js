import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    }
});

const questionSchema = new mongoose.Schema(
    {
        question_text: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionType',
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium'
        },
        options: {
            type: [optionSchema],
            validate: [arrayLimit, '{PATH} must have exactly 4 options']
        },
        correct_option_index: {
            type: Number,
            required: true,
            min: 0,
            max: 3
        },
        points: {
            type: Number,
            default: 1
        },
        time_limit: {
            type: Number,
            default: 60
        },
        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// Validate that there are exactly 4 options
function arrayLimit(val) {
    return val.length === 4;
}

// Add indexes for better query performance
questionSchema.index({ type: 1 });
questionSchema.index({ category: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ is_active: 1 });

const Question = mongoose.model('Question', questionSchema);

export default Question;