import { db } from "@/lib/db";
import { zodEmailPassword } from "@/lib/validators";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { unsensitiveUser } from "./utils";

// Create a transporter for sending email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const body = zodEmailPassword.parse(await req.json());
    const { email, password } = body;
    const existingUser = await db.user.findUnique({ where: { email: email } });
    if (existingUser) {
      return NextResponse.json(
        { user: null, message: "User already exist" },
        { status: 409 }
      );
    } else {
      const hashedPassword = await hash(password, 12);
      const newUser = await db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      const token = generateToken(newUser);
      const emailResponse = await sendVerificationEmail(newUser.email, token);

      if (emailResponse.rejected) {
        return null;
      }
      return NextResponse.json(
        {
          user: unsensitiveUser(newUser),
          message: "User created, verify email to activate account",
        },
        { status: 201 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
// Generate a JWT token with user information
export function generateToken(userData: User) {
  // Create a token with user data and sign it with the secret key
  const token = jwt.sign(
    userData.email,
    process.env.NEXTAUTH_SECRET as string,
    {
      expiresIn: undefined,
    }
  );

  return token;
}

export function verifyToken(token: string) {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
    return decoded;
  } catch (error) {
    // Token verification failed
    return null;
  }
}

// Function to send an email with the token
export async function sendVerificationEmail(toEmail: string, token: string) {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL, // Replace with your email address
      to: toEmail, // Recipient's email address
      subject: "Verify your email", // Email subject
      text: `Click the following link to verify your email: /auth/verify-email?token=${token}`, // Email body with token link
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
