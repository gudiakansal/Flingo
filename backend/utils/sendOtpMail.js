import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",   // better than service: "Gmail"
  port: 465,
  secure: true,             // true for 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, // must be 16-digit Google App Password
  },
});

// Optional: verify connection once (good for debugging)
transporter.verify((error, success) => {
  if (error) {
    console.log("Mail server error:", error);
  } else {
    console.log("Mail server is ready");
  }
});

export const sendOtpMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Flingo Support" <${process.env.EMAIL}>`,
      to,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset OTP</h2>
          <p>Your OTP for password reset is:</p>
          <h1 style="color:#ff4d2d;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    });

    console.log("OTP Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending OTP mail:", error.message);
    throw new Error("Failed to send OTP email");
  }
};
