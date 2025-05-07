import TestInvitation from "../models/testInvitation.js";
import Assessment from "../models/Assessment.js";
import nodeMailer from "nodemailer";
import crypto from "crypto";

const assessmentController = {
     sendInvitation : async (req, res) => {
        try {
          const { email, assessmentId, validityPeriod } = req.body;
      
          // Validate assessment ID
          const assessment = await Assessment.findById(assessmentId);
          if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found' });
          }
      
          // Generate a passkey
          const passkey = crypto.randomBytes(16).toString('hex');
      
          // Create invitation
          const invitation = new TestInvitation({
            email,
            assessment: assessmentId,
            passkey,
            validityStart: new Date(),
            validityEnd: new Date(Date.now() + validityPeriod), // validityPeriod in milliseconds
            createdBy: req.user._id,
          });
      
          await invitation.save();
      
          // Send email with invitation link
          const invitationLink = `${process.env.FRONTEND_URL}/invitation/${invitation._id}?passkey=${passkey}`;
      
          const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your email service
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
      
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Test Invitation',
            text: `You are invited to take an assessment. Please click the link below to begin:
            
            ${invitationLink}
            
            The link is valid until ${invitation.validityEnd}`,
          };
      
          await transporter.sendMail(mailOptions);
      
          res.status(201).json({ message: 'Test invitation sent successfully', invitation });
        } catch (err) {
          res.status(500).json({ error: 'Failed to send invitation', details: err.message });
        }
      },
      
      // Get all invitations (for recruiters/admins)
       getAllInvitations : async (req, res) => {
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
       getInvitationById : async (req, res) => {
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
       validateInvitation : async (req, res) => {
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
       deleteInvitation : async (req, res) => {
        try {
          const deleted = await TestInvitation.findByIdAndDelete(req.params.id);
      
          if (!deleted) return res.status(404).json({ error: 'Invitation not found' });
      
          res.json({ message: 'Invitation deleted' });
        } catch (err) {
          res.status(500).json({ error: 'Failed to delete invitation', details: err.message });
        }
      }
};

export default assessmentController;