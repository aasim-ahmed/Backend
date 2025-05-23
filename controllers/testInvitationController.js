import TestInvitation from "../models/TestInvitation.js";
import Assessment from "../models/Assessment.js";
import sendTestInvitationEmail from "../utils/emailService.js";
import crypto from "crypto";
import "dotenv/config";

const testInvitationController = {
  sendInvitation: async (req, res) => {
    try {
      const { email, assessmentId, validityPeriod } = req.body;

      const assessment = await Assessment.findById(assessmentId);
      if (!assessment) {
        return res.status(404).json({ error: 'Assessment not found' });
      }

      const passkey = crypto.randomBytes(16).toString('hex');

      const invitation = new TestInvitation({
        email,
        assessment: assessmentId,
        passkey,
        validityStart: new Date(),
        validityEnd: new Date(Date.now() + validityPeriod),
        createdBy: req.user._id,
      });

      await invitation.save();

      const invitationLink = `${process.env.FRONTEND_URL}/invitation/${invitation._id}?passkey=${passkey}`;

      await sendTestInvitationEmail(email, passkey, invitationLink, invitation.validityEnd);

      res.status(201).json({ message: 'Test invitation sent successfully', invitation });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send invitation', details: err.message });
    }
  },
  
  // Get all invitations (for recruiters/admins)
  getAllInvitations: async (req, res) => {
    try {
      const invitations = await TestInvitation.find()
        .populate('assessment')
        .populate('createdBy', 'firstName lastName email');
      
      res.json({ invitations });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch invitations', details: err.message });
    }
  },
  
  // Get an invitation by ID
  getInvitationById: async (req, res) => {
    try {
      const invitation = await TestInvitation.findById(req.params.id)
        .populate('assessment')
        .populate('createdBy', 'firstName lastName email');
      
      if (!invitation) return res.status(404).json({ error: 'Invitation not found' });
      
      res.json({ invitation });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch invitation', details: err.message });
    }
  },
  
  // Validate invitation passkey
  validateInvitation: async (req, res) => {
    try {
      const { invitationId, passkey } = req.body;
      
      const invitation = await TestInvitation.findById(invitationId);
      
      if (!invitation) {
        return res.status(404).json({ error: 'Invitation not found' });
      }
      
      // Check if passkey matches
      if (invitation.passkey !== passkey) {
        return res.status(400).json({ error: 'Invalid passkey' });
      }
      
      // Check if the invitation is still valid
      const now = new Date();
      if (invitation.validityEnd < now) {
        return res.status(400).json({ error: 'Invitation has expired' });
      }
      
      res.json({ message: 'Invitation validated successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to validate invitation', details: err.message });
    }
  },
  
  // Delete an invitation
  deleteInvitation: async (req, res) => {
    try {
      const deleted = await TestInvitation.findByIdAndDelete(req.params.id);
      
      if (!deleted) return res.status(404).json({ error: 'Invitation not found' });
      
      res.json({ message: 'Invitation deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete invitation', details: err.message });
    }
  },

  // Verify passkey from URL parameter
  verifyPasskey: async (req, res) => {
    const { passkey } = req.params;
    try {
        const invitation = await TestInvitation.findOne({ passkey });
        if (!invitation) {
            return res.status(404).json({ message: 'Test invitation not found' });
        }
        // Check if the invitation has expired
        const now = new Date();
        if (now < invitation.validityStart || now > invitation.validityEnd) {
            return res.status(400).json({ message: 'Test invitation has expired' });
        }
        // Update invitation status to 'accepted'
        invitation.status = 'accepted';
        await invitation.save();
        res.status(200).json({ message: 'Passkey verified successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }
};

export default testInvitationController;