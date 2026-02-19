import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path

import { emailOTP } from "better-auth/plugins";

import { Resend } from "resend";

import { PrismaClient } from "../app/generated/prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY!);

const prisma = new PrismaClient();
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    emailOTP({
      storeOTP: "encrypted",
      overrideDefaultEmailVerification: true,
      disableSignUp: false,
      async sendVerificationOTP({ email, otp }) {
        try {
          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: `Email Verification Code`,
            html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #007bff; background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
    .footer { text-align: center; font-size: 14px; color: #666; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Verify Your Email</h1>
    <p>Thanks for starting the verification process!</p>
  </div>
  <div style="padding: 20px;">
    <p>We want to make sure it's really you. Please enter the following code:</p>
    <div class="otp-code">${otp}</div>
    <p style="font-size: 14px; color: #666;">(This code is valid for 10 minutes)</p>
  </div>
  <div class="footer">
    <p>Please do not share this code with anyone. We will never ask you for it.</p>
  </div>
</body>
</html>`.trim(),
            text: `VERIFY YOUR EMAIL ADDRESS\nThanks for starting the verification process. We want to make sure it is really you. Please enter the following verification code when prompted. If you do not want to create an account, you can ignore this message.\n
Verification code: ${otp}\n(This code is valid for 10 minutes)\n
----------------------------------------\n
Please do not share this code with anyone. We will never ask you for this code.`,
          });
        } catch (error) {
          console.error("Failed to send OTP email:", error);
        }
        return;
      },
      otpLength: 6,
      allowedAttempts: 5,
      expiresIn: 600,
    }),
  ],
});
