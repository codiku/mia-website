import nodemailer from "nodemailer";
import { headers } from "next/headers";

// Function to send an email with the token
export async function sendVerificationEmail(toEmail: string, token: string) {
  try {
    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587 as unknown as number,
      auth: {
        user: "apikey",
        pass: "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",
      },
    });
    // Send the email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM, // Replace with your email address
      to: toEmail, // Recipient's email address
      subject: "Verify your email", // Email subject
      text: `Click the following link to verify your email: http://${headers().get(
        "host"
      )}/api/auth/verify-email?token=${token}`, // Email body with token link
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
