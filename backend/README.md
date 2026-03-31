# 🏨 Hostel Booking System — Backend Progress Report

## 📌 Project Overview

This is a role-based Hostel Booking Backend System designed for a university campus.

The system supports:

* Student authentication (hostellers only)
* Admin authentication (main admin + sub admin)
* Role-based access control (RBAC)
* Hostel eligibility filtering
* Bulk room mapping via Excel upload
* Structured and normalized relational schema
* FCFS-ready architecture

The backend is designed to be:

* Scalable
* Secure
* Modular
* Database-normalized
* Transaction-safe

---

# ✅ Completed Phases

---

## 🔐 Phase 1 — Authentication Layer (Completed)

### Student Authentication

**Endpoints**

* `POST /api/student/login`
* `GET /api/student/profile`

**Features**

* Validates against `auth_db`
* Checks `hosteller = true`
* Auto-syncs student into `hostel_db`
* Generates JWT containing:

  * type
  * roll_number
  * name
  * year
  * gender

---

### Admin Authentication

**Endpoints**

* `POST /api/admin/login`
* `GET /api/admin/profile`

**Features**

* Validates against `auth_db`
* Generates JWT containing:

  * type
  * employee_id
  * name
  * role
* Role-based access control enforced

---

## 🔒 Role-Based Middleware (Completed)

Implemented:

* `verifyToken`
* `requireStudent`
* `requireAdmin`
* `requireMainAdmin`

Access Control Rules:

* Students cannot access admin routes
* Sub admins cannot modify data
* Only main admin can modify system structure

---

# 🗄 Database Architecture

## 1️⃣ Auth Database (`auth_db`)

Source of truth for authentication.

### Tables:

* `students`
* `admins`

---

## 2️⃣ Hostel Database (`hostel_db`)

Dedicated to hostel booking domain.

---

# 🏗 Phase 2 — Domain Schema (Completed)

Fully normalized schema implemented.

---

## 🏨 hostels

* `hostel_id` (Primary Key)
* `hostel_name` (Unique)
* `gender`
* `is_active`

---

## 📚 hostel_allowed_years

Composite Primary Key:

```
(hostel_id, year)
```

---

## 🛏 rooms

Composite Primary Key:

```
(hostel_id, room_number)
```

Fields:

* `total_beds`
* `available_beds`
* `is_ac`

---

## 👨‍🎓 hostel_students

* `roll_number` (Primary Key)
* `year`
* `gender`
* `room_allocated`
* `hostel_id`
* `room_number`

---

# 🌐 Phase 3 — Hostel Management APIs (Completed)

## Main Admin Capabilities

* `POST /api/admin/hostels`
* `POST /api/admin/hostels/:id/years`
* `GET /api/admin/hostels`

---

## Student Capabilities

* `GET /api/student/hostels`

Eligibility filters:

* gender
* year
* hostel is_active

---

# 🛏 Phase 4 — Room Mapping System (Completed) 🔥

Bulk room creation and update using Excel upload.

---

## 📂 Workflow

```
Admin selects hostel
→ Upload Excel file
→ Backend parses & validates data
→ Smart preview generated
→ Admin confirms
→ Rooms inserted/updated in DB (transaction-safe)
```

---

## 📡 APIs

| Method | Endpoint                                    | Description                      |
| ------ | ------------------------------------------- | -------------------------------- |
| POST   | `/api/admin/hostels/:id/rooms/preview`      | Preview Excel upload             |
| POST   | `/api/admin/hostels/:id/rooms/confirm`      | Apply changes (transaction-safe) |

---

## 📊 Excel Handling Features

* Flexible column mapping
* Case-insensitive headers
* Extra columns ignored
* Empty rows skipped

---

## ✅ Validation Rules

* `1 ≤ total_beds ≤ 3`
* Invalid rows skipped with warnings
* Duplicate rooms rejected

---

## 🧠 Smart Preview System

Categorizes rooms:

* **New Rooms** → Insert
* **Updated Rooms** → Modify
* **Unchanged Rooms** → Skip

---

## 🔒 Safety Rule (Critical)

```
Cannot reduce beds below already allocated students
```

Ensures no invalid allocation states.

---

## ⚙️ Transaction-Safe Confirm API

* Inserts new rooms
* Updates existing rooms
* Skips unchanged rooms

```
All operations run inside a single transaction
→ On error: FULL rollback
```

---

## ♻️ Idempotent Design

* Re-uploading same file is safe
* No duplicate inserts
* Only actual changes are applied

---

# 🧠 Architectural Highlights

* Clean separation of concerns
* Normalized relational schema
* Composite primary keys
* Backend as single source of truth
* Idempotent operations
* Transaction-safe design
* Validation-first architecture

---

# 🚀 Upcoming Phases

---

## 🧾 Phase 5 — Booking Window Control (Next)

* Open/close booking globally
* Control booking availability

---

## ⚡ Phase 6 — Booking Engine (FCFS)

* Transaction-based booking
* Concurrency-safe allocation
* Double booking prevention

---

## 📊 Phase 7 — Admin Dashboard

* Room occupancy
* Bed availability
* Allocation insights

---

## 🔐 Phase 8 — Production Hardening

* Transactions & locking
* Rate limiting
* Audit logs
* Deployment configs

---

# 🎯 Current System Status

* Authentication: ✅ Complete
* Role enforcement: ✅ Complete
* Domain schema: ✅ Complete
* Hostel APIs: ✅ Complete
* Room mapping system: 🔥 Complete
* Booking window: ⏳ Next
* Booking engine: ⏳ Pending

---

---

# 📡 Complete API Reference

All implemented backend endpoints are listed below.

---

## 🔐 Authentication APIs

### 👨‍🎓 Student

| Method | Endpoint               | Access  | Description                       |
| ------ | ---------------------- | ------- | --------------------------------- |
| POST   | `/api/student/login`   | Public  | Login student (hosteller only)    |
| GET    | `/api/student/profile` | Student | Get authenticated student profile |

---

### 👨‍💼 Admin

| Method | Endpoint             | Access | Description                     |
| ------ | -------------------- | ------ | ------------------------------- |
| POST   | `/api/admin/login`   | Public | Login admin                     |
| GET    | `/api/admin/profile` | Admin  | Get authenticated admin profile |

---

## 🏨 Hostel Management APIs

### 🔷 Main Admin

| Method | Endpoint                       | Access     | Description                     |
| ------ | ------------------------------ | ---------- | ------------------------------- |
| POST   | `/api/admin/hostels`           | Main Admin | Create new hostel               |
| POST   | `/api/admin/hostels/:id/years` | Main Admin | Define allowed years for hostel |

---

### 🔷 Admin / Sub Admin (Read Only)

| Method | Endpoint             | Access            | Description                         |
| ------ | -------------------- | ----------------- | ----------------------------------- |
| GET    | `/api/admin/hostels` | Admin / Sub Admin | View all hostels with allowed years |

---

### 👨‍🎓 Student Hostel APIs

| Method | Endpoint               | Access  | Description                                                     |
| ------ | ---------------------- | ------- | --------------------------------------------------------------- |
| GET    | `/api/student/hostels` | Student | View eligible hostels (filtered by gender, year, active status) |

---

## 🛏 Room Mapping APIs

### 🔷 Main Admin Only

| Method | Endpoint                               | Access     | Description                              |
| ------ | -------------------------------------- | ---------- | ---------------------------------------- |
| POST   | `/api/admin/hostels/:id/rooms/preview` | Main Admin | Preview Excel upload (validation + diff) |
| POST   | `/api/admin/hostels/:id/rooms/confirm` | Main Admin | Apply changes (transaction-safe)         |

---

## 🔑 Role Summary

| Role       | Capabilities                                                             |
| ---------- | ------------------------------------------------------------------------ |
| Student    | Login, view profile, view eligible hostels                               |
| Sub Admin  | Login, view hostels                                                      |
| Main Admin | Full access: create hostels, manage years, upload & confirm room mapping |

---

## 📊 Endpoint Count

```plaintext id="cnt001"
Total Endpoints: 10
```

* 2 Student Auth
* 2 Admin Auth
* 2 Hostel Management (Write)
* 1 Hostel View (Admin)
* 1 Hostel View (Student)
* 2 Room Mapping APIs

---


# 📌 Next Milestone

```
Implement booking window control
→ Then FCFS booking engine
```

---

## 👨‍💻 Author

Backend system designed and implemented as part of a **production-oriented system design project**.
