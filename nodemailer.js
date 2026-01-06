const { Resend } = require('resend');

// Using Resend SDK instead of Nodemailer
// Env vars required:
// - RESEND_API_KEY
// - EMAIL_FROM (recommended, verified sender in Resend)
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, subject, html) => {
    return resend.emails.send({
        from: process.env.EMAIL_FROM || process.env.EMAIL,
        to: email,
        subject,
        html,
    });
};

module.exports = sendEmail;