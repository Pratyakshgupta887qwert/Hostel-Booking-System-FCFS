# 🏨 Hostel Booking System -- Backend

Backend service for Hostel Booking System (FCFS based).

------------------------------------------------------------------------

## 🚀 Tech Stack

-   Node.js
-   Express.js
-   PostgreSQL
-   Sequelize (ORM)
-   JWT (Authentication)
-   bcrypt (Password Hashing)

------------------------------------------------------------------------

## 📦 Project Setup

### 1️⃣ Clone the Repository

``` bash
git clone <repo-url>
cd Hostel-Booking-System-FCFS/backend
```

------------------------------------------------------------------------

### 2️⃣ Install Dependencies

``` bash
npm install
```

------------------------------------------------------------------------

### 3️⃣ Environment Setup

Copy the example file:

``` bash
cp .env.example .env
```

(Windows users can manually copy and rename.)

Update `.env` with your local PostgreSQL credentials.

------------------------------------------------------------------------

### 4️⃣ Create Local Database

Make sure PostgreSQL is installed.

Create database:

auth_db

You can create it using pgAdmin or:

``` bash
psql -U postgres -c "CREATE DATABASE auth_db;"
```

------------------------------------------------------------------------

### 5️⃣ Seed Auth Database (500 Dummy Students)

``` bash
npm run seed:auth
```

This will:

-   Create `students` table
-   Insert 500 dummy records
-   70% hostellers, 30% dayscholars
-   All passwords are hashed

🔐 Default Password for All Students:

hostel123

Example login:

student1@gla.ac.in\
password: hostel123

------------------------------------------------------------------------

### 6️⃣ Reset Database (If Needed)

``` bash
npm run reset:auth
npm run seed:auth
```

⚠️ This will drop existing tables.

------------------------------------------------------------------------

### 7️⃣ Start Development Server

``` bash
npm run dev
```

Server runs on:

http://localhost:5000

------------------------------------------------------------------------

## 🧱 Current Progress

-   Auth DB setup
-   Sequelize connection configured
-   Server startup guarded by DB connection
-   Seed + Reset scripts implemented
-   500 dummy students created

------------------------------------------------------------------------

## 🔐 Environment Variables Required

PORT=5000

AUTH_DB_HOST=localhost\
AUTH_DB_PORT=5432\
AUTH_DB_NAME=auth_db\
AUTH_DB_USER=postgres\
AUTH_DB_PASSWORD=your_password_here

JWT_SECRET=your_super_secret_key\
JWT_EXPIRES_IN=1d

------------------------------------------------------------------------

## 📌 Notes

-   `.env` should NOT be committed.
-   Use `.env.example` as reference.
-   Always work on your own branch.
-   Pull latest changes before starting work.

------------------------------------------------------------------------

## 📈 Next Steps

-   Implement Login API
-   Create Hostel DB
-   Sync logic between Auth DB and Hostel DB
-   Implement JWT middleware
-   Build booking system
