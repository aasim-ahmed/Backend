import express from "express";
import invitationController from "../controllers/testInvitationController.js";
import auth from "../middleware/authMiddleware.js";

const testInvitationRoutes = express.Router();  


// Send a new test invitation
testInvitationRoutes.post('/', auth, invitationController.sendInvitation);

// Get all invitations (admin/recruiter view)
testInvitationRoutes.get('/', auth, invitationController.getAllInvitations);

// Get one invitation by ID
testInvitationRoutes.get('/:id', auth, invitationController.getInvitationById);

// Validate invitation link + passkey
testInvitationRoutes.post('/validate', invitationController.validateInvitation);

// Delete an invitation
testInvitationRoutes.delete('/:id', auth, invitationController.deleteInvitation);

export default testInvitationRoutes;