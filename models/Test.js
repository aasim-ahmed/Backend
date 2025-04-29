import mongoose from 'mongoose';

const testSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a test title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot be more than 500 characters']
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question'
            }
        ],
        duration: {
            type: Number,  // Duration in minutes
            required: [true, 'Please specify test duration'],
            min: [1, 'Test duration must be at least 1 minute']
        },
        total_marks: {
            type: Number,
            default: 0
        },
        passing_percentage: {
            type: Number,
            required: [true, 'Please specify passing percentage'],
            min: [0, 'Passing percentage cannot be less than 0'],
            max: [100, 'Passing percentage cannot be more than 100'],
            default: 60
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        difficulty_level: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium'
        },
        instructions: {
            type: String,
            trim: true
        },
        is_timed: {
            type: Boolean,
            default: true
        },
        randomize_questions: {
            type: Boolean,
            default: false
        },
        show_results_immediately: {
            type: Boolean,
            default: true
        },
        is_active: {
            type: Boolean,
            default: true
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual for question count
testSchema.virtual('question_count').get(function() {
    return this.questions ? this.questions.length : 0;
});

// Pre-save hook to calculate total marks based on questions
testSchema.pre('save', async function(next) {
    if (this.questions && this.questions.length > 0) {
        try {
            const Question = mongoose.model('Question');
            const questions = await Question.find({
                _id: { $in: this.questions }
            });
            
            this.total_marks = questions.reduce((total, question) => total + question.points, 0);
        } catch (error) {
            console.error('Error calculating total marks:', error);
        }
    }
    next();
});

const Test = mongoose.model('Test', testSchema);

export default Test;