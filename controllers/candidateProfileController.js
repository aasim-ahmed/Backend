import CandidateProfile from "../models/CandidateProfile.js";

const candidateProfileRoutes = {
     createOrUpdateProfile : async (req, res) => {
        try {
          const { email, fullName, phone, education, experience, assessment } = req.body;
      
          // Upsert profile based on email + assessment
          const profile = await CandidateProfile.findOneAndUpdate(
            { email, assessment },
            { email, fullName, phone, education, experience, assessment },
            { new: true, upsert: true }
          );
      
          res.status(200).json({ message: 'Profile saved successfully', profile });
        } catch (err) {
          res.status(500).json({ error: 'Failed to save profile', details: err.message });
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

