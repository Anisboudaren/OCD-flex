// models/otpModel.js
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});
// Define a function to send emails

const mailSender = async (email, title, body) => {
  try {
   
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port : 465 , 
      srcure : true , 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: 'Urgent CODflex team - verification code',
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email info: ", info); // Log the entire response
    return info; // Ensure the entire response is returned
  } catch (error) {
    console.log("Error in sending email: ", error.message);
    throw error; // Rethrow the error if needed
  }
};

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      'Verification Email',
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse); // Check the returned response
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  
  if (this.isNew) {
    try {
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema);