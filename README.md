# 🔐 Next.js Passwordless Authentication System

A **production-ready passwordless authentication system** built with Next.js.

Users authenticate using a **6-digit One-Time Password (OTP)** sent to their email. If verified within **10 minutes**, they are redirected to the dashboard.

---

## ✨ Features

- ✅ Passwordless login (Email + OTP)
- ✅ 6-digit OTP generation
- ✅ 10-minute OTP expiration
- ✅ Secure session handling
- ✅ Prisma ORM with Neon DB
- ✅ Email delivery using Resend
- ✅ OAuth ready (Google & GitHub optional)
- ✅ Production-ready architecture

---

## 🛠 Tech Stack

| Category      | Technology           |
| ------------- | -------------------- |
| **Framework** | Next.js (App Router) |
| **Language**  | TypeScript           |
| **Auth**      | BetterAuth           |
| **Database**  | Neon PostgreSQL      |
| **ORM**       | Prisma               |
| **Email**     | Resend               |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd nextjs-passwordless-auth
npm install
# or yarn install, pnpm install, bun install


# Create .env in root

# Database
DATABASE_URL=""

# Better Auth
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="http://localhost:3000"

# OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Email
RESEND_API_KEY=""
```

3. Prisma Setup

bash
npx prisma generate
npx prisma migrate dev --name init

⚙️ Algorithm: Passwordless OTP Login

    User submits email

    Check if email exists

    Generate random 6-digit OTP

    Set expiration: current time + 10 minutes

    Store OTP & expiration in database

    Send OTP via Resend email

    User submits OTP

    Retrieve stored OTP from database

    IF (entered OTP == stored OTP) AND (current time < expiration)

        ✅ Create user session

        ✅ Redirect to dashboard

        ❌ ELSE show error

    End

| Feature        | Implementation           |
| -------------- | ------------------------ |
| OTP Expiration | 10 minutes               |
| Single-use OTP | Recommended              |
| Sessions       | Secure HTTP-only cookies |
| Validation     | Server-side only         |
| No Passwords   | Passwordless design      |
| Secrets        | Environment variables    |

# Data Flow Diagram (Level 0)

User
↓
[Authentication System]
↓
[Database: Neon PostgreSQL]
↓
[Email Service: Resend]

# Data Flow Diagram (Level 1)

User → [Sign In Page] → [OTP Generator] → [Database: Store OTP] → [Email Service]
↑ ↓
[Enter OTP] ← [OTP Verification] ← [Session Manager] → [Dashboard]
