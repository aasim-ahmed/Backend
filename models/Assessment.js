import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      instructions: {
        type: String,
      },
      tests: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Test',
        },
      ],
      totalTime: {
        type: Number, // in minutes
        default: 0,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Assessment = mongoose.model('Assessment', assessmentSchema);
  
  export default Assessment;