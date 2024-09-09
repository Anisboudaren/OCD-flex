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

const sendResetPasswordEmail = async (email, resetToken, resetURL) => {
  try {
    const mailResponse = await mailSender(
      email,
      'Password Reset Request',
      `
      <h1>Password Reset Request</h1>
      <p>You are receiving this email because you (or someone else) have requested the reset of a password for your account.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `
    );
    console.log('Password reset email sent successfully: ', mailResponse);
  } catch (error) {
    console.log('Error occurred while sending password reset email: ', error);
    throw error;
  }
};

module.exports = { sendVerificationEmail , mailSender , sendResetPasswordEmail };
