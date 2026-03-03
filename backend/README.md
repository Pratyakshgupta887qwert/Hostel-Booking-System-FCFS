# Hostel Booking System — Backend (Phase 3 Schema Completed)

## Current Status

Authentication layer is complete.  
Core hostel domain schema has been designed and implemented with clean relational modeling.

System now includes:

- Role-based access control
- Dual database architecture
- Normalized hostel domain schema
- Composite primary keys for room modeling
- Centralized model associations
- FCFS-ready database structure

System is stable and ready for booking logic implementation.

---

# 🔐 Authentication Layer (Phase 2 Complete)

## Student Authentication

### Endpoints

- POST /api/student/login
- GET /api/student/profile (Protected)

### Features

- Validates against Auth DB (students table)
- Checks hosteller = true
- Syncs student into hostel_db on first login
- Generates JWT containing:
  - type
  - roll_number
  - name
  - year
  - gender
- Role-protected profile route

---

## Admin Authentication

### Endpoints

- POST /api/admin/login
- GET /api/admin/profile (Protected)

### Features

- Validates against Auth DB (admins table)
- Generates JWT containing:
  - type
  - employee_id
  - name
  - role
- Role-protected profile route

---

## Role-Based Middleware

Implemented:

- verifyToken
- requireStudent
- requireAdmin
- requireMainAdmin

Access separation:

- Students cannot access admin routes
- Admins cannot access student routes
- Only main admin can manage system structure

---

# 🗄 Database Architecture

## 1️⃣ Auth Database (auth_db)

Source of truth for authentication.

### Tables

- students
- admins

This database is NOT modified by hostel booking logic.

---

## 2️⃣ Hostel Database (hostel_db)

Dedicated to booking and allocation logic.

---

# 🏨 Domain Schema (Phase 3)

Fully normalized relational schema implemented.

---

## 1️⃣ hostels

| Column      | Type    | Key         |
| ----------- | ------- | ----------- |
| hostel_id   | INTEGER | Primary Key |
| hostel_name | STRING  | Unique      |
| gender      | ENUM    | —           |
| is_active   | BOOLEAN | —           |

Purpose:

- Structural entity
- Parent table for rooms and allowed years
- Controlled by main admin

---

## 2️⃣ hostel_allowed_years

Composite Primary Key:

(hostel_id, year)

| Column    | Type    | Key               |
| --------- | ------- | ----------------- |
| hostel_id | INTEGER | PK + FK → hostels |
| year      | INTEGER | PK                |

Purpose:

- Defines academic eligibility per hostel
- Replaces 4-boolean-column design
- Fully normalized

---

## 3️⃣ rooms

Composite Primary Key:

(hostel_id, room_number)

| Column         | Type    | Key               |
| -------------- | ------- | ----------------- |
| hostel_id      | INTEGER | PK + FK → hostels |
| room_number    | STRING  | PK                |
| total_beds     | INTEGER | —                 |
| available_beds | INTEGER | —                 |
| is_ac          | BOOLEAN | —                 |

Purpose:

- Core FCFS capacity control table
- Bed count tracked here
- No derived data in hostel table

---

## 4️⃣ hostel_students

| Column         | Type    | Key                       |
| -------------- | ------- | ------------------------- |
| roll_number    | INTEGER | Primary Key               |
| year           | INTEGER | —                         |
| gender         | ENUM    | —                         |
| room_allocated | BOOLEAN | —                         |
| hostel_id      | INTEGER | FK → hostels              |
| room_number    | STRING  | Logical reference → rooms |

Purpose:

- Live allocation state table
- Tracks current hostel & room assignment
- Not a booking history table
- Auto-synced on first login

Composite FK to rooms is logically enforced at application level through transactional booking.

---

# 🔗 Relationships Overview

Hostel
├── Rooms
├── Allowed Years
└── Hostel Students

Room
└── Hostel Students

- Rooms use composite primary key
- Allowed years use composite primary key
- Foreign key integrity enforced at hostel level
- Composite room integrity enforced via application logic

---

# ⚙️ Architectural Decisions

- No derived fields stored in hostel table
- No redundant year columns
- Composite PK used for room identity
- Associations centralized in models/index.js
- Clean model import structure
- Sequelize sync controlled centrally
- Booking integrity handled through transactions (planned)

---

# 🧪 Testing Status

- Student login/profile ✅
- Admin login/profile ✅
- Role enforcement ✅
- Cross-role blocking ✅
- Model synchronization ✅
- All domain tables created successfully ✅

---

# 🚀 Next Phase (Phase 4)

- Admin APIs for:
  - Create Hostel
  - Define Allowed Years
  - Add Rooms
- Global booking window logic
- FCFS transactional booking implementation
- Concurrency control with row locking
- Booking transaction service layer

---

# 🎯 System Readiness

Backend is now:

- Structurally normalized
- Role-secure
- Database-consistent
- FCFS-ready
- Cleanly modularized

Ready to move into transactional booking logic.
