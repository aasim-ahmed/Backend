import nodemailer from 'nodemailer';

const sendInvitationEmail = async (to, assessmentTitle, passkey, link) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const html = `
      <h3>Assessment Invitation</h3>
      <p>You are invited to take <b>${assessmentTitle}</b></p>
      <p><b>Link:</b> <a href="${link}">${link}</a></p>
      <p><b>Passkey:</b> ${passkey}</p>
    `;
  
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Your Assessment Invitation',
      html,
    });
  };
  
  export default sendInvitationEmail;