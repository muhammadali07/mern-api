const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

exports.sendReminder = async (email, message) => {
  await transporter.sendMail({ from: process.env.EMAIL_USER, to: email, subject: 'Clock-In Reminder', text: message });
};