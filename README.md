<div align="center">

# 🏨 Hostel Booking System

### First-Come, First-Serve Room Allocation Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?logo=socket.io)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**A real-time hostel booking platform that guarantees fair room allocation using atomic database transactions, live availability updates, and secure payment integration.**

Designed for **universities** and **colleges** to eliminate double bookings, ensure fairness, and provide transparent hostel allocation.

[Features](#-key-features) • [Getting Started](#-getting-started) • [Architecture](#-system-architecture) • [Documentation](#-documentation)

</div>

---

## 📌 Project Overview

The **Hostel Booking System** is a MERN-based web application that implements a strict **first-come, first-serve (FCFS)** room allocation mechanism for college hostels.

Unlike traditional booking systems that suffer from race conditions and overbooking, this platform uses **MongoDB transactions, atomic operations, and real-time WebSocket communication** to ensure only one student can book the last available bed—even under heavy concurrent load.

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
- **MongoDB ACID transactions** prevent double bookings
- **Socket.IO** broadcasts availability updates in real-time
- **Payment reservations** hold beds temporarily during checkout
- **Automatic expiry** releases unpaid bookings

---

## ✨ Key Features

### 🔐 Secure Authentication
- JWT-based authentication
- Role-based access control (Student / Admin)
- Protected API routes with middleware
- Session management

---

### 🏢 Hostel & Room Management (Admin)
- Create and manage multiple hostels
- Add rooms with capacity configuration
- Enable/disable booking windows
- Real-time occupancy monitoring
- Bulk operations support

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
1. Start MongoDB session & transaction
2. Check: Booking window open + Student has no existing booking + Room has beds
3. Atomically decrement available beds using $inc
4. Create booking with PENDING_PAYMENT status
5. Commit transaction
6. Emit real-time availability update
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
- Monitor SLA compliance
- Export reports (CSV/PDF)
- Manage cancellations
- Room-wise occupancy analytics

---

## 🏗️ System Architecture

The system follows a **Three-Tier Architecture**:

```
React Frontend (Vite)
   ↓ (REST API + WebSocket)
Node.js + Express Backend
   ↓ (ACID Transactions)
MongoDB
   ↓
Payment Gateway (Razorpay/Stripe)
```

### Core Principles (Non-Negotiable)
1. ✅ **Backend-controlled booking only** – No frontend trust
2. ✅ **One student → one active booking**
3. ✅ **First request wins, others fail gracefully**
4. ✅ **Payment and booking must always stay consistent**
5. ✅ **Atomic operations prevent race conditions**

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
- **MongoDB** (with Mongoose)
- **Socket.IO** (Real-time communication)
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)
- **Razorpay/Stripe** SDK (Payments)

### Database
- **MongoDB** (ACID transactions enabled)

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
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Auth & validation
│   ├── utils/                  # Helper functions
│   └── server.js
│
├── docs/
│   └── PRD.md                  # Complete Product Requirements Document
│
└���─ README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (v6.0+)
- npm or yarn

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Pratyakshgupta887qwert/HostelBookingSystem.git
cd HostelBookingSystem
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

**Create `.env` file:**
```env
# Database
MONGO_URI=mongodb://localhost:27017/hostel_booking

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

### 🎯 Concurrency Control
```javascript
// Atomic booking operation using MongoDB transactions
const room = await Room.findOneAndUpdate(
  { _id: roomId, availableBeds: { $gt: 0 } },
  { $inc: { availableBeds: -1 } },
  { new: true, session }
);
```

### ⚡ Real-Time Updates
```javascript
// Socket.IO event emission
io.emit('room:availability', {
  roomId: room._id,
  availableBeds: room.availableBeds
});
```

### 🔒 Payment Safety
- 15-minute booking hold
- Webhook signature verification
- Automatic expiry with cron jobs
- Refund initiation on failure

---

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/register      # Register new student
POST   /api/auth/login         # Login (Student/Admin)
GET    /api/auth/profile       # Get user profile
```

### Bookings
```
POST   /api/bookings           # Create booking (FCFS)
GET    /api/bookings/my-bookings  # Get user bookings
GET    /api/bookings/all       # Get all bookings (Admin)
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
POST   /api/payments/webhook        # Payment webhook
GET    /api/payments/:id/status     # Check payment status
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
> **[View PRD](https://gist.github.com/Pratyakshgupta887qwert/b61ce590894d7380172fc55518cb6de0)**

---

## 🎓 Academic Context

This project demonstrates:

- ✅ **Distributed Systems** – Race condition handling
- ✅ **Database Management** – ACID transactions
- ✅ **Real-Time Systems** – WebSocket communication
- ✅ **Software Engineering** – Clean architecture, SOLID principles
- ✅ **Full-Stack Development** – MERN stack proficiency

---

## 🙏 Acknowledgments

- MongoDB documentation for transaction examples
- Socket.IO community for real-time patterns
- Razorpay/Stripe for payment integration guides

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**Made with ❤️ for fair and transparent hostel allocation**

</div>
