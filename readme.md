# 📬 **Subscription Tracker**

A lightweight backend service built with **Express.js** and **MongoDB** to help users seamlessly track and manage their subscriptions. From user registration to automated email reminders — all functionality is exposed via clean, well-structured REST APIs.

---

## 🛠️ Tech Stack

* **Backend Framework:** Express.js 🟢
* **Database:** MongoDB 🍃
* **Scheduler:** Upstash (Redis) 📤
* **Email Service:** NodeMailer 📬
* **Authentication:** JWT 🔒
* **Time Management:** dayjs 🗓
* **Security Layer:** Arcjet 🛡

---

## 🚀 Features

### 🔐 User Authentication

* Sign Up
* Sign In
* Sign Out

### 📦 Subscription Management

* Add new subscriptions
* Automatically schedule reminders via Upstash

### 📧 Notifications

* Email reminders sent using NodeMailer

### 📘 RESTful API

* Ready-to-integrate endpoints for frontend consumption

---

## 🔑 How It Works

1. Users sign up and log in.
2. They create subscriptions by specifying names and reminder dates.
3. Reminders are scheduled via Upstash.
4. Scheduled reminders trigger automated email notifications.

---

## ⚙️ Local Setup

### 1. Clone the Repository

```bash
git clone git@github.com:Umesh11032000/SubSnap.git
cd SubSnap
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.development.local` file and add the following:

```env
PORT=5500
SERVER_URL='http://localhost:5500'
NODE_ENV=development

DB_URL='your_mongodb_url'

JWT_SECRET='your_jwt_secret'
JWT_EXPIRES_IN='1h'

ARCJET_ENV=development
ARCJET_KEY='your_arcjet_key'

QSTASH_URL='http://127.0.0.1:8080'
QSTASH_TOKEN='your_qstash_token'
QSTASH_CURRENT_SIGNING_KEY='your_current_signing_key'
QSTASH_NEXT_SIGNING_KEY='your_next_signing_key'

EMAIL_PASSWORD='your_email_password'
```

### 4. Start the Server

```bash
npm run dev
```

---

## 🤝 Contributing

Contributions are welcome!
Feel free to [open issues](https://github.com/Umesh11032000/SubSnap/issues) or submit a pull request.
