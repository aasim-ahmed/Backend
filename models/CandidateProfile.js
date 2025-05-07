import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
      education: {
        type: String,
      },
      experience: {
        type: String,
      },
      assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const CandidateProfile = mongoose.model('CandidateProfile', candidateProfileSchema);
  
  export default CandidateProfile;