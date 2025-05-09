import express from "express";
import candidateProfileController from "../controllers/candidateProfileController.js";
import auth from "../middleware/authMiddleware.js";

const candidateProfileRoutes = express.Router();

// Create new candidate profile (called after passkey validation)
candidateProfileRoutes.post('/', candidateProfileController.submitProfile);

// Update candidate profile

candidateProfileRoutes.put('/:id', candidateProfileController.updateProfile);

// Get all candidate profiles (for recruiters)
candidateProfileRoutes.get('/', auth, candidateProfileController.getAllProfiles);

// Get candidate profile by ID
candidateProfileRoutes.get('/:id', auth, candidateProfileController.getProfileById);

// Delete candidate profile
candidateProfileRoutes.delete('/:id', auth, candidateProfileController.deleteProfile);

export default candidateProfileRoutes;