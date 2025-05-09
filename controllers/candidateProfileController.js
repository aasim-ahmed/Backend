import CandidateProfile from "../models/CandidateProfile.js";
import TestInvitation from "../models/TestInvitation.js"; 

const candidateProfileRoutes = {
  submitProfile: async (req, res) => {
    try {
      const { passkey, invitationId, email, fullName, phone, education, experience } = req.body;

      // Step 1: Verify invitation
      const invitation = await TestInvitation.findById(invitationId);

      if (
        !invitation ||
        invitation.passkey !== passkey ||
        new Date() > new Date(invitation.validityEnd)
      ) {
        return res.status(400).json({ error: "Invalid or expired invitation" });
      }

      // Optional: prevent multiple submissions
      const existing = await CandidateProfile.findOne({ email, assessment: invitation.assessment });
      if (existing) {
        return res.status(409).json({ error: "Profile already submitted for this assessment" });
      }

      // Step 2: Create profile
      const profile = new CandidateProfile({
        email,
        fullName,
        phone,
        education,
        experience,
        assessment: invitation.assessment,
      });

      await profile.save();

      res.status(201).json({ message: "Profile submitted successfully", profile });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to submit profile", details: err.message });
    }
  
},
      updateProfile : async (req, res) => {
        try {
          const updated = await CandidateProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
          if (!updated) return res.status(404).json({ error: 'Profile not found' });
      
          res.json({ message: 'Profile updated', profile: updated });
        } catch (err) {
          res.status(500).json({ error: 'Failed to update profile', details: err.message });
        } 
      },
      // Get all candidate profiles (restricted to recruiters/admins)
       getAllProfiles : async (req, res) => {
        try {
          const profiles = await CandidateProfile.find().populate('assessment');
          res.json({ profiles });
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch profiles', details: err.message });
        }
      },
      
      // Get single profile by ID
       getProfileById : async (req, res) => {
        try {
          const profile = await CandidateProfile.findById(req.params.id).populate('assessment');
      
          if (!profile) return res.status(404).json({ error: 'Profile not found' });
      
          res.json({ profile });
        } catch (err) {
          res.status(500).json({ error: 'Failed to fetch profile', details: err.message });
        }
      },
      
      // Delete profile
       deleteProfile : async (req, res) => {
        try {
          const deleted = await CandidateProfile.findByIdAndDelete(req.params.id);
      
          if (!deleted) return res.status(404).json({ error: 'Profile not found' });
      
          res.json({ message: 'Candidate profile deleted' });
        } catch (err) {
          res.status(500).json({ error: 'Failed to delete profile', details: err.message });
        }
      }

}
export default candidateProfileRoutes

