# 📬 Subscription Tracker

A lightweight backend service built with Express.js and MongoDB to help users track and manage their subscriptions. From signing up to receiving reminders — everything’s handled via simple and well-structured APIs.

## 🔧 Tech Stack

- 🟢 ExpressJS
- 🍃 MongoDB
- 📤 Upstash (Redis for scheduling reminders)
- 📬 NodeMailer (for email notifications)
- 🔒 JWT (for secure auth)
- 🗓 dayjs (for time manipulation)
- 🛡 Arcjet (for security)

## 🚀 Features

- ✅ User Authentication
  - Sign Up
  - Sign In
  - Sign Out
- 📦 Subscription Management
  - Create a subscription
  - Automatically schedule reminders (via Upstash)
- 📧 Email Reminders via NodeMailer
- 📘 Fully functional REST APIs — ready to plug into your frontend

## 🔑 How It Works

1. A user signs up and logs in using their credentials.
2. They can then create a subscription by specifying the name and reminder dates.
3. When a subscription is created, a reminder is scheduled via Upstash.
4. Reminders trigger automated emails

## ⚙️ Setup & Run Locally

```bash
# Clone the repo
git clone git@github.com:Umesh11032000/SubSnap.git

# Install dependencies
cd SubSnap
npm install

# Set up environment variables
create a `.env.development.local`

PORT=5500
SERVER_URL='http://localhost:5500'
NODE_ENV=development

DB_URL='your_mongodb_url'

JWT_SECRET=mysecret
JWT_EXPIRES_IN='1h'

ARCJET_ENV=development
ARCJET_KEY=mysecret

QSTASH_URL='http://127.0.0.1:8080'
QSTASH_TOKEN='mytoken'
QSTASH_CURRENT_SIGNING_KEY='your_current_signing_key'
QSTASH_NEXT_SIGNING_KEY='your_next_signing_key'

EMAIL_PASSWORD='your_email_password'


# Start the server
npm run dev
````

> Contributions welcome — feel free to open issues or submit a PR!
