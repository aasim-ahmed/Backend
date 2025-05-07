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
       createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);



const QuestionType = mongoose.model('QuestionType', questionTypeSchema);

export default QuestionType;