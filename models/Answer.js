import mongoose from "mongoose";

const AnswerSchema = mongoose.Schema({
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    selected_option_index:{
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
    iscorrect:{
       type: Boolean,
       required: true
    }

},{
    timestamps: true
});

const Answer = mongoose.model('Answer', AnswerSchema);

export default Answer;