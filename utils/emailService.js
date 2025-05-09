import nodemailer from 'nodemailer';
import 'dotenv/config';
import { log } from 'console';

const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // ✅ make sure this matches the .env key
  },
});

const sendTestInvitationEmail = async (toEmail, passkey, link, expiry) => {
  const mailOptions = {
    
    
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Your SkillSnap Assessment Invitation',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
          }
          .header {
            background-color: #4a86e8;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
          }
          .button {
            display: inline-block;
            background-color: #4a86e8;
            color: white; 
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            font-size: 12px;
            color: #888888;
            text-align: center;
            margin-top: 20px;
            border-top: 1px solid #e0e0e0;
            padding-top: 15px;
          }
          .passkey {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 18px;
            letter-spacing: 1px;
            text-align: center;
            margin: 15px 0;
          }
          .expiry {
            color: #e74c3c;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SkillSnap Assessment</h1>
          </div>
          <div class="content">
            <h2>You've Been Invited!</h2>
            <p>Hello,</p>
            <p>You have been selected to showcase your skills through the SkillSnap assessment platform. Your personalized assessment is now ready for you.</p>
            
            <p>Below is your unique passkey to access the assessment:</p>
            <div class="passkey">${passkey}</div>
            
            <p>To begin your assessment:</p>
            <center><a href="${link}" class="button">START YOUR ASSESSMENT</a></center>
            
            <p>Please note that this assessment link will expire on: <span class="expiry">${new Date(expiry).toLocaleString()}</span></p>
            
            <p>Best of luck with your assessment!</p>
            <p>The SkillSnap Team & Techno Aasim</p>
          </div>
          <div class="footer">
            <p>If you received this email by mistake, please disregard it or contact support.</p>
            <p>© ${new Date().getFullYear()} SkillSnap - All rights reserved</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await emailTransporter.sendMail(mailOptions);
    console.log('Test invitation email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Error sending email');
  }
 
  
};

export default sendTestInvitationEmail;