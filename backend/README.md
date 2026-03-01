# Hostel Booking System -- Backend (Phase 2 Completed)

## Current Status

Authentication system is fully implemented with role-based access
control.

---

## Student Authentication

### Endpoints

- POST /api/student/login
- GET /api/student/profile (Protected)

### Features

- Validates against Auth DB (students table)
- Checks hosteller status
- Syncs student into hostel_db on first login
- Generates JWT with:
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
- Generates JWT with:
  - type
  - employee_id
  - name
  - role
- Role-protected profile route

---

## Role-Based Middleware

Implemented middlewares: - verifyToken - requireStudent - requireAdmin -
requireMainAdmin

Access control is enforced between student and admin routes.

---

## Database Architecture

### Auth DB

- students table
- admins table

### Hostel DB

- hostel_students table (auto-sync on student login)

---

## Testing Status

All test cases passed: - Student login/profile - Admin login/profile -
Cross-role access blocked

---

## Next Phase

- Hostel model
- Room model
- Booking window logic
- Admin-only protected routes

System is structurally stable and ready for domain-level development.
