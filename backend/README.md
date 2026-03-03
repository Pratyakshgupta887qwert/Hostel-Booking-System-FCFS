# 🏨 Hostel Booking System — Backend Progress Report

## 📌 Project Overview

This is a role-based Hostel Booking Backend System designed for a university campus.

The system supports:

- Student authentication (hostellers only)
- Admin authentication (main admin + sub admin)
- Role-based access control (RBAC)
- Hostel eligibility filtering
- Structured and normalized relational schema
- FCFS-ready architecture

The backend is designed to be:

- Scalable
- Secure
- Modular
- Database-normalized
- Transaction-ready

---

# ✅ Completed Phases

---

## 🔐 Phase 1 — Authentication Layer (Completed)

### Student Authentication

**Endpoints**

- `POST /api/student/login`
- `GET /api/student/profile`

**Features**

- Validates against `auth_db`
- Checks `hosteller = true`
- Auto-syncs student into `hostel_db`
- Generates JWT containing:
  - type
  - roll_number
  - name
  - year
  - gender

---

### Admin Authentication

**Endpoints**

- `POST /api/admin/login`
- `GET /api/admin/profile`

**Features**

- Validates against `auth_db`
- Generates JWT containing:
  - type
  - employee_id
  - name
  - role
- Role-based access control enforced

---

## 🔒 Role-Based Middleware (Completed)

Implemented:

- `verifyToken`
- `requireStudent`
- `requireAdmin`
- `requireMainAdmin`

Access Control Rules:

- Students cannot access admin routes
- Sub admins cannot modify data
- Only main admin can create or modify system structure

---

# 🗄 Database Architecture

## 1️⃣ Auth Database (`auth_db`)

Source of truth for authentication.

### Tables:

- `students`
- `admins`

This database is not modified by booking logic.

---

## 2️⃣ Hostel Database (`hostel_db`)

Dedicated to hostel booking domain.

---

# 🏗 Phase 2 — Domain Schema (Completed)

Fully normalized schema implemented.

---

## 🏨 hostels

- `hostel_id` (Primary Key, auto increment)
- `hostel_name` (Unique)
- `gender`
- `is_active`

Purpose:

- Core structural entity
- Parent table for rooms and eligibility

---

## 📚 hostel_allowed_years

Composite Primary Key:

```
(hostel_id, year)
```

Purpose:

- Defines which academic years can book a hostel
- Replaces boolean year columns
- Fully normalized

---

## 🛏 rooms

Composite Primary Key:

```
(hostel_id, room_number)
```

Fields:

- `total_beds`
- `available_beds`
- `is_ac`

Purpose:

- Core capacity control table
- FCFS booking-ready structure
- No derived data stored in hostel table

---

## 👨‍🎓 hostel_students

- `roll_number` (Primary Key)
- `year`
- `gender`
- `room_allocated`
- `hostel_id`
- `room_number`

Purpose:

- Live allocation state table
- Tracks current assignment
- Not a booking history table
- Synced on first login

Composite FK to rooms is enforced logically via transaction-level validation.

---

# 🌐 Phase 3 — Hostel Management APIs (Completed)

## Main Admin Capabilities

- Create Hostel  
  `POST /api/admin/hostels`

- Define Allowed Years  
  `POST /api/admin/hostels/:id/years`

- View All Hostels (Admin & Sub Admin)  
  `GET /api/admin/hostels`

---

## Student Capabilities

- View Eligible Hostels  
  `GET /api/student/hostels`

Eligibility filters:

- gender match
- year allowed
- hostel is_active = true

Clean separation of student and admin controllers implemented.

---

# 🧠 Architectural Highlights

- Clean separation of concerns
- No mixed student/admin logic
- Composite primary keys for room modeling
- No redundant data storage
- Associations centralized in `models/index.js`
- Application-level integrity enforcement
- FCFS-ready schema
- Scalable for concurrency control

---

# 🚀 Upcoming Phases

---

## 🛠 Phase 4 — Room Management

To be finalized after team discussion:

Possible approaches:

- Single room creation
- Bulk room creation
- Auto-generation (A101–A120 style)

Decision pending.

---

## ⚡ Phase 5 — Booking Engine (Core FCFS Logic)

Planned features:

- Transaction-based booking
- Row-level locking
- Concurrency-safe bed decrement
- Allocation update in `hostel_students`
- Double booking prevention
- Booking window control

---

## 🧾 Phase 6 — Booking Window Control

- Open/Close booking globally
- Role-based booking control
- Possibly year-based booking windows

---

## 📊 Phase 7 — Admin Dashboard

- View total beds per hostel
- View occupancy
- View allocated students
- Reset allocation per academic year

---

## 🔐 Phase 8 — Production Hardening

- Sequelize transactions
- Optimistic/pessimistic locking
- Rate limiting
- Audit logging
- Refresh token implementation
- Environment configuration for deployment
- Deployment to cloud (Render / Railway / etc.)

---

# 🎯 Current System Status

- Authentication layer: ✅ Stable
- Role enforcement: ✅ Stable
- Domain schema: ✅ Implemented
- Hostel management APIs: ✅ Working
- Student eligibility filtering: ✅ Working
- Room API: ⏳ Pending
- Booking engine: ⏳ Pending

System foundation is clean, stable, and ready for transactional booking development.

---

---

# 📡 API Endpoints Overview

All currently implemented backend endpoints are listed below.

---

## 🔐 Authentication APIs

### 👨‍🎓 Student Authentication

| Method | Endpoint               | Access  | Description                       |
| ------ | ---------------------- | ------- | --------------------------------- |
| POST   | `/api/student/login`   | Public  | Login student (hosteller only)    |
| GET    | `/api/student/profile` | Student | Get authenticated student profile |

---

### 👨‍💼 Admin Authentication

| Method | Endpoint             | Access | Description                     |
| ------ | -------------------- | ------ | ------------------------------- |
| POST   | `/api/admin/login`   | Public | Login admin                     |
| GET    | `/api/admin/profile` | Admin  | Get authenticated admin profile |

---

## 🏨 Hostel Management APIs

### 🔷 Main Admin Only

| Method | Endpoint                       | Access     | Description                     |
| ------ | ------------------------------ | ---------- | ------------------------------- |
| POST   | `/api/admin/hostels`           | Main Admin | Create new hostel               |
| POST   | `/api/admin/hostels/:id/years` | Main Admin | Define allowed years for hostel |

---

### 🔷 Admin & Sub Admin (Read-Only)

| Method | Endpoint             | Access            | Description                         |
| ------ | -------------------- | ----------------- | ----------------------------------- |
| GET    | `/api/admin/hostels` | Admin / Sub Admin | View all hostels with allowed years |

---

### 👨‍🎓 Student Hostel Access

| Method | Endpoint               | Access  | Description                                                     |
| ------ | ---------------------- | ------- | --------------------------------------------------------------- |
| GET    | `/api/student/hostels` | Student | View eligible hostels (filtered by gender, year, active status) |

---

# 🔑 Role Access Summary

| Role       | Capabilities                                                 |
| ---------- | ------------------------------------------------------------ |
| Student    | Login, view profile, view eligible hostels                   |
| Sub Admin  | Login, view all hostels                                      |
| Main Admin | Login, create hostel, define allowed years, view all hostels |

---

# 🧭 Endpoint Categories Summary

Total Implemented Endpoints: **8**

- 2 Student Auth APIs
- 2 Admin Auth APIs
- 2 Main Admin Management APIs
- 1 Admin Hostel View API
- 1 Student Hostel View API

Room management and booking APIs are pending implementation.

# 📌 Next Milestone

Finalize room creation strategy →  
Implement room APIs →  
Build FCFS booking transaction engine.
