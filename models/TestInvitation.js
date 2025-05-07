import mongoose from "mongoose";

const testInvitationSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
      assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true,
      },
      passkey: {
        type: String,
        required: true,
      },
      validityStart: {
        type: Date,
        default: Date.now,
      },
      validityEnd: {
        type: Date,
        required: true,
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
  
  const TestInvitation = mongoose.model('TestInvitation', testInvitationSchema);
  
  export default TestInvitation;  