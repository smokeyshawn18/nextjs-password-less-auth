# 🔐 Next.js Passwordless Authentication System

A production-ready passwordless authentication system.

Users authenticate using a 6-digit One-Time Password (OTP) sent to their email.  
If verified within 10 minutes, they are redirected to the dashboard.

---

# Features of this auth system

- Passwordless login (Email + OTP)
- 6-digit OTP generation
- 10-minute OTP expiration
- Secure session handling
- Prisma ORM with Neon DB
- Email delivery using Resend
- OAuth ready (Google & GitHub optional)
- Production-ready architecture

---

# 🏗 Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Authentication: BetterAuth
- Database: Neon PostgreSQL
- ORM: Prisma
- Email Service: Resend

```

### 3. Set Up Environment Variables
Create a `.env` file in the project root and add the required environment variables:
```

# Environment variables declared in this file are NOT automatically loaded by Prisma.

# Please add `import "dotenv/config";` to your `prisma.config.ts` file, or use the Prisma CLI with Bun

# to load environment variables from .env files: https://pris.ly/prisma-config-env-vars.

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.

# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# Database connection URL

DATABASE_URL=""

# Better Auth Configuration

BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="http://localhost:3000" # Base URL of your app

# OAuth Credentials if you wanna use

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Resend API Key

RESEND_API_KEY=""

```

### 4. Prisma Setup
Generate the Prisma client and run migrations:
```

npx prisma generate
npx prisma migrate dev --name init

````

### 5. Run the Development Server
Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

# System Flowchart

+------------------+
| User Enters |
| Email |
+--------+---------+
|
v
+------------------+
| Generate 6-digit |
| OTP |
+--------+---------+
|
v
+------------------+
| Store OTP with |
| 10 min Expiry |
+--------+---------+
|
v
+------------------+
| Send OTP via |
| Resend Email |
+--------+---------+
|
v
+------------------+
| User Enters OTP |
+--------+---------+
|
v
+----------------------+
| Validate OTP & Time |
+--------+-------------+
|
+-----+------+
| |
v v
Valid Invalid
| |
v v
Create Show Error
Session
|
v
Redirect to Dashboard

# System Data Flow Diagram

Level - 0

User
|
v
Authentication System
|
v
Database (Neon PostgreSQL)
|
v
Email Service (Resend)

```

Level - 1

User --> [Sign In Page] --> [OTP Generator]
                                  |
                                  v
                           [Database: Store OTP]
                                  |
                                  v
                           [Email Service]
                                  |
                                  v
User <-- Enter OTP <-- [OTP Verification]
                                  |
                                  v
                           [Session Manager]
                                  |
                                  v
                             Dashboard


```

# Algorithm: Passwordless OTP Login

Step 1: User submits email
Step 2: Check if email exists
Step 3: Generate random 6-digit OTP
Step 4: Set expiration time = current time + 10 minutes
Step 5: Store OTP and expiration in database
Step 6: Send OTP to user email
Step 7: User submits OTP
Step 8: Retrieve stored OTP from database
Step 9: IF
  (entered OTP == stored OTP)
  AND (current time < expiration time)
  THEN
   Create user session
   Redirect to dashboard
  ELSE
   Show error message
Step 10: End

```

# Security Considerations

OTP expires in 10 minutes

OTP single-use recommended

Secure HTTP-only cookies

Server-side validation

No password stored

Secret keys stored in environment variables


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Development Environment

Tools and technologies used in the development of the project:

- Microsoft Visual Studio Code
```
