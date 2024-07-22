import nodemailer from "nodemailer";

// Function to send an email with the token
export async function sendEmail(toEmail: string, subject: string, html: string) {
  try {
    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT as unknown as number,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    // Send the email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM, // Replace with your email address
      to: toEmail, // Recipient's email address
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
