# 🏨 Hostel Booking System -- Backend

Backend service for a FCFS-based Hostel Booking System.

This system is focused strictly on booking operations (not full hostel
management). Historical records are not maintained between academic
sessions.

---

# 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)
- JWT (Authentication)
- bcrypt (Password Hashing)
- Helmet, CORS, Morgan

---

# 🧱 Architecture Overview

## 🔐 Auth Database (auth_db)

Source of truth for:

- Student identity
- Hosteller status
- Year
- Gender

- Admin accounts (planned)

Authentication always happens here.

---

## 🏠 Hostel Database (hostel_db)

Used only for:

- Booking logic
- Room allocation
- Availability management

`hostel_students` table contains only active hostellers for the current
academic session.

---

# 🔐 Student Authentication Flow

1.  Student submits email & password
2.  Validate from auth_db
3.  Ensure `hosteller = true`
4.  Ensure record exists in hostel_db
5.  Generate JWT (1 day expiry)
6.  Protected routes require Bearer token

JWT Payload (Student):

{ "type": "student", "roll_number": 1001, "name": "Student Name",
"year": 2, "gender": "male" }

---

# 🔄 Academic Session Reset Strategy

This system does NOT store historical booking data.

At the beginning of every new academic session:

1.  TRUNCATE hostel_students table
2.  Reset room availability
3.  Open booking window

Fresh records will be recreated automatically when: - Student logs in -
Admin performs booking (future feature)

---

# 🛠 Phase Progress

## ✅ Phase 1 -- Student Authentication

- Structured folder architecture
- Auth DB integration
- Hashed passwords
- JWT authentication
- Auth middleware
- Protected routes

## ✅ Phase 2 -- Online Sync to Hostel DB

- hostel_db created
- hostel_students table created
- Auto-sync during login
- Clean reset strategy

## 🔜 Phase 3 -- Admin Authentication (Next)

- Admin model & seeding
- Admin login API
- Role-based JWT
- Main Admin / Sub Admin support
- Middleware for role validation

---

# 📦 Setup Instructions

## Install Dependencies

npm install

## Environment Setup

Create `.env` file with:

PORT=5000

AUTH_DB_HOST=localhost AUTH_DB_PORT=5432 AUTH_DB_NAME=auth_db
AUTH_DB_USER=postgres AUTH_DB_PASSWORD=your_password

JWT_SECRET=your_long_random_secret JWT_EXPIRES_IN=1d

## Seed Auth Database

npm run seed:auth

Default student password: hostel123

## Start Development Server

npm run dev

Server runs at: http://localhost:5000

---

# 👨‍💻 Development Rules

- Never commit `.env`
- Always work on your own branch
- Pull from main before starting work
- Keep Auth DB and Hostel DB responsibilities separate
- Keep business logic out of controllers when possible

---

System designed with clean separation of concerns, simplicity, and
controlled scope.
