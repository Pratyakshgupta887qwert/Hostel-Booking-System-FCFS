<div align="center">

# 🏨 Hostel Booking System

### First-Come, First-Serve Room Allocation Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![SQL](https://img.shields.io/badge/SQL-PostgreSQL%20%7C%20MySQL-336791?logo=postgresql)](#-technology-stack)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?logo=socket.io)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**A real-time hostel booking platform that guarantees fair room allocation using SQL transactions with row-level locking, live availability updates, and secure payment integration.**

Designed for **universities** and **colleges** to eliminate double bookings, ensure fairness, and provide transparent hostel allocation.

[Features](#-key-features) • [Getting Started](#-getting-started) • [Architecture](#-system-architecture) • [Documentation](#-documentation)

</div>

---

## 📌 Project Overview

The **Hostel Booking System** is a full-stack web application that implements a strict **first-come, first-serve (FCFS)** room allocation mechanism for college hostels.

Unlike traditional booking systems that suffer from race conditions and overbooking, this platform uses **SQL ACID transactions, row-level locking (`SELECT ... FOR UPDATE`), and real-time WebSocket communication** to ensure only one student can book the last available bed—even under heavy concurrent load.

---

## 🎯 Problem Statement

College hostel booking systems often face critical issues:

- **Multiple students booking the same room simultaneously**
- **Delayed availability updates** causing confusion
- **Overbooking due to race conditions**
- **Payment completed but room unavailable**
- **Manual conflict resolution** by administrators

These issues create unfair allotment, student dissatisfaction, and administrative overhead.

---

## ✅ Solution

This system provides a **backend-controlled, transaction-safe booking platform** where:

- Rooms are allotted strictly on **FCFS basis** with millisecond precision
- **SQL ACID transactions + row locks** prevent double bookings
- **Socket.IO** broadcasts availability updates in real-time
- **Payment reservations** hold beds temporarily during checkout
- **Automatic expiry** releases unpaid bookings
- **Admin can create offline/manual bookings** safely using the same locking and consistency rules

---

## ✨ Key Features

### 🔐 Secure Authentication (Domain Restricted)
- JWT-based authentication
- Role-based access control (Student / Admin)
- Protected API routes with middleware
- **Only `@gla.ac.in` student email IDs allowed** (registration/login)

---

### 🏢 Hostel & Room Management (Admin)
- Create and manage multiple hostels
- Add rooms with capacity configuration
- Enable/disable booking windows
- Real-time occupancy monitoring
- Bulk operations support

---

### 🧾 Offline Booking (Admin) — NEW
- Admin can create **offline/manual bookings** on behalf of students
- Uses the same FCFS-safe **SQL transactions + row locks**
- Immediately broadcasts availability updates to all users

---

### ⚡ Real-Time Availability Display
- Live bed count updates via Socket.IO
- No page refresh required
- Instant availability sync across all users
- Connection status indicators

---

### 🎯 FCFS Booking Core (Transaction-Safe)

When a student clicks **"Book Now"**:

```
1. Begin SQL transaction
2. Check: Booking window open + Student has no existing active booking
3. Lock room row using SELECT ... FOR UPDATE
4. If beds available → decrement available beds
5. Create booking with PENDING_PAYMENT status
6. Commit transaction
7. Emit real-time availability update
```

**If any condition fails → transaction rolls back, no changes made**

---

### 💳 Secure Payment Integration
- Razorpay / Stripe sandbox integration
- Temporary bed reservation (15-minute hold)
- Webhook verification for payment confirmation
- Automatic booking expiry and bed release
- Idempotent webhook processing

---

### 📊 Student Dashboard
- View booking history
- Check payment status
- Download booking confirmation
- Real-time booking updates

---

### 🛠️ Admin Dashboard
- View all bookings with filters
- Export reports (CSV/PDF)
- Manage cancellations
- Room-wise occupancy analytics
- Create offline bookings

---

## 🏗️ System Architecture

The system follows a **Three-Tier Architecture**:

```
React Frontend (Vite)
   ↓ (REST API + WebSocket)
Node.js + Express Backend
   ↓ (ACID Transactions + Row Locks)
SQL Database (PostgreSQL/MySQL)
   ↓
Payment Gateway (Razorpay/Stripe)
```

### Core Principles (Non-Negotiable)
1. ✅ **Backend-controlled booking only** – No frontend trust
2. ✅ **One student → one active booking**
3. ✅ **First request wins, others fail gracefully**
4. ✅ **Payment and booking must always stay consistent**
5. ✅ **SQL transactions + row locks prevent race conditions**
6. ✅ **Offline bookings follow the same consistency guarantees**

---

## 🧰 Technology Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** / CSS Modules
- **Axios** (API calls)
- **Socket.IO Client** (Real-time updates)
- **React Router** (Navigation)
- **Context API** (State management)

### Backend
- **Node.js** + **Express.js**
- **SQL Database** (PostgreSQL recommended / MySQL supported)
- ORM/Query Layer: **Prisma / Sequelize / Knex** (choose one)
- **Socket.IO** (Real-time communication)
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)
- **Razorpay/Stripe** SDK (Payments)

### Database
- **PostgreSQL / MySQL**
- **Row-level locking** + **ACID transactions**

---

## 📂 Project Structure

```
HostelBookingSystem/
│
├── client/                     # Frontend (React.js)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Full page components
│   │   ├── context/            # Auth & Socket context
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service layer
│   │   └── App.jsx
│   └── package.json
│
├── server/                     # Backend (Node.js + Express)
│   ├── config/                 # DB & Socket config
│   ├── controllers/            # Business logic
│   ├── models/                 # SQL models (Prisma/Sequelize/etc.)
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Auth & validation
│   ├── utils/                  # Helper functions
│   └── server.js
│
├── docs/
│   └── PRD.md                  # Complete Product Requirements Document
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+) **or** MySQL (v8+)
- npm or yarn

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Pratyakshgupta887qwert/Hostel-Booking-System-FCFS.git
cd Hostel-Booking-System-FCFS
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

**Create `.env` file:**
```env
# Database (choose one)
DATABASE_URL=postgresql://user:password@localhost:5432/hostel_booking
# DATABASE_URL=mysql://user:password@localhost:3306/hostel_booking

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Payment Gateway
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Policy
ALLOWED_STUDENT_EMAIL_DOMAIN=gla.ac.in
```

**Start the server:**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

**Create `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_key_id
```

**Start the development server:**
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## 🔥 Key Technical Highlights

### 🎯 Concurrency Control (SQL + Row Locks)
```sql
-- Lock the room row so only one transaction can decrement beds at a time
BEGIN;

SELECT id, available_beds
FROM rooms
WHERE id = :roomId
FOR UPDATE;

-- If available_beds > 0:
UPDATE rooms
SET available_beds = available_beds - 1
WHERE id = :roomId;

-- Insert booking (PENDING_PAYMENT) with expires_at
COMMIT;
```

### ⚡ Real-Time Updates
```javascript
// Socket.IO event emission
io.emit('room:availability', {
  roomId,
  availableBeds
});
```

### 🔒 Payment Safety
- 15-minute booking hold
- Webhook signature verification
- Automatic expiry with scheduled jobs
- Refund initiation on failure (policy-based)
- Idempotent payment verification

---

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/register      # Register new student (only @gla.ac.in)
POST   /api/auth/login         # Login (Student/Admin)
GET    /api/auth/profile       # Get user profile
```

### Bookings
```
POST   /api/bookings              # Create booking (FCFS)
GET    /api/bookings/my-bookings  # Get user bookings
GET    /api/bookings/all          # Get all bookings (Admin)
PUT    /api/bookings/:id/cancel   # Cancel booking
```

### Rooms
```
GET    /api/rooms              # Get all rooms
GET    /api/rooms/:id          # Get room details
POST   /api/rooms              # Create room (Admin)
PUT    /api/rooms/:id          # Update room (Admin)
```

### Payments
```
POST   /api/payments/create-session  # Initialize payment
POST   /api/payments/webhook         # Payment webhook
GET    /api/payments/:id/status      # Check payment status
```

### Admin (Offline Booking)
```
POST   /api/admin/offline-booking    # Create offline/manual booking (Admin)
```

---

## 🧪 Testing

### Run Unit Tests
```bash
npm test
```

### Run Load Tests
```bash
npm run test:load
```

**Load Test Goals:**
- ✅ 500+ concurrent booking requests
- ✅ Zero double bookings
- ✅ <100ms availability update latency

---

## 📈 Project Status

- **Current Version:** v1.0
- **Status:** 🚧 In Development
- **Type:** Academic / Portfolio / Full-Stack Project

---

## 🔮 Future Enhancements

### Phase 2
- 📊 Admin analytics dashboard
- 📧 Email/SMS notifications
- ⏰ Cancellation & waitlist system

### Phase 3
- 📱 Mobile app (React Native)
- 🤖 Chatbot for queries
- 📈 Load balancing for peak times

### Phase 4
- 🧠 AI-based room recommendations
- 👥 Roommate matching algorithm
- 🌍 Multi-campus support

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Pratyaksh Gupta**  
GitHub: [@Pratyakshgupta887qwert](https://github.com/Pratyakshgupta887qwert)

---

## 📚 Documentation

> 📘 **Detailed Documentation Available:**  
> Complete product requirements, system design, and technical specifications →  
> **See `docs/PRD.md` in this repository.**

---

## 🎓 Academic Context

This project demonstrates:

- ✅ **Distributed Systems** – race condition handling
- ✅ **Database Management** – SQL ACID transactions + row locking
- ✅ **Real-Time Systems** – WebSocket communication
- ✅ **Software Engineering** – clean architecture, SOLID principles
- ✅ **Full-Stack Development** – React + Node/Express + SQL

---

## 🙏 Acknowledgments

- PostgreSQL/MySQL documentation for transaction + locking patterns
- Socket.IO community for real-time patterns
- Razorpay/Stripe for payment integration guides

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**Made with ❤️ for fair and transparent hostel allocation**

</div>
