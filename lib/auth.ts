import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path

import { emailOTP } from "better-auth/plugins";

import { Resend } from "resend";
import VerifyEmail from "@/components/auth/verification-email";
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
            react: VerifyEmail({ otp }),
            text: `VERIFY YOUR EMAIL ADDRESS\nThanks for starting the verification process. We want to make sure it is really you. Please enter the following verification code when prompted. If you do not want to create an account, you can ignore this message.\n
            Verification code\n${otp}\n(This code is valid for 10 minutes)\n
            ----------------------------------------\n
            Please do not share this code with anyone. We will never ask
            you for this code.`,
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
