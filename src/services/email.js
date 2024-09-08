// services/emailService.js
const nodemailer = require('nodemailer');

// Function to send emails
const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: 'Urgent CODflex team - verification code',
      to: email,
      subject: title,
      html: body,
    });

    console.log('Email info: ', info);
    return info;
  } catch (error) {
    console.log('Error in sending email: ', error.message);
    throw error;
  }
};

// Function to send verification email
const sendVerificationEmail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(
      email,
      'Verification Email',
      `<h1>Please confirm your OTP</h1><p>Here is your OTP code: ${otp}</p>`
    );
    console.log('Email sent successfully: ', mailResponse);
  } catch (error) {
    console.log('Error occurred while sending email: ', error);
    throw error;
  }
};

module.exports = { sendVerificationEmail };
