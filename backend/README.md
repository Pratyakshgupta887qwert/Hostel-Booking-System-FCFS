# 🏨 Hostel Booking System -- Backend

Backend service for a FCFS-based Hostel Booking System.

This system is designed strictly for hostel booking purposes (not full
hostel management). No historical records are maintained between
academic sessions.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)
- JWT (Authentication)
- bcrypt (Password Hashing)
- Helmet, CORS, Morgan

---

## 🧱 Architecture Overview

### 🔐 Auth Database (auth_db)

Source of truth for: - Student identity - Hosteller status - Year -
Gender

Authentication always happens here.

---

### 🏠 Hostel Database (hostel_db) -- Phase 2

Used only for: - Booking logic - Room allocation - Availability
management

`hostel_students` table contains only active hostellers for the current
session.

---

## 🔐 Authentication Flow

1.  Student submits email & password
2.  Validate from auth_db
3.  Ensure hosteller = true
4.  Generate JWT (1 day expiry)
5.  Protected routes require Bearer token

Token expires after 1 day. Frontend should remove token from memory on
tab close.

---

## 🔄 Academic Session Reset Strategy

This system does NOT store historical booking data.

At the beginning of every new academic session:

1.  TRUNCATE hostel_students table
2.  Reset room availability
3.  Open booking window

Fresh records will be recreated automatically: - When student logs in -
When admin performs booking (future feature)

---

## 📦 Setup Instructions

### Install Dependencies

npm install

### Environment Setup

cp .env.example .env

Required variables:

PORT=5000 AUTH_DB_HOST=localhost AUTH_DB_PORT=5432 AUTH_DB_NAME=auth_db
AUTH_DB_USER=postgres AUTH_DB_PASSWORD=your_password
JWT_SECRET=your_long_random_secret JWT_EXPIRES_IN=1d

### Seed Auth Database

npm run seed:auth

Default password: hostel123

### Start Development Server

npm run dev

Server: http://localhost:5000

---

## ✅ Completed (Phase 1)

- Structured project architecture
- Auth DB integration
- Hashed passwords
- Login API
- JWT authentication
- Auth middleware
- Protected route

---

## 🔜 Next Phase (Phase 2)

- Create hostel_db
- Create hostel_students table
- Sync logic during login
- Room & allocation design

---

## 👨‍💻 Development Rules

- Never commit `.env`
- Always work on your own branch
- Pull before starting work
- Keep Auth DB and Hostel DB responsibilities separate

System designed for simplicity, clarity, and controlled scope.
