import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'recruiter', 'technical_expert', 'candidate'],
      default: 'candidate',
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
      },
      
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;