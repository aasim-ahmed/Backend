import mongoose from 'mongoose';

const questionTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a question type name'],
            trim: true,
            unique: true,
            maxlength: [50, 'Name cannot be more than 50 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [200, 'Description cannot be more than 200 characters']
        },
        icon: {
            type: String,
            trim: true
        },
        is_active: {
            type: Boolean,
            default: true
        },
        display_order: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Indexes for better query performance
questionTypeSchema.index({ is_active: 1 });
questionTypeSchema.index({ display_order: 1 });

const QuestionType = mongoose.model('QuestionType', questionTypeSchema);

export default QuestionType;