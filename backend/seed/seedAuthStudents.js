import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { Sequelize, DataTypes } from "sequelize";

// Create Sequelize instance for Auth DB
const sequelize = new Sequelize(
  process.env.AUTH_DB_NAME,
  process.env.AUTH_DB_USER,
  process.env.AUTH_DB_PASSWORD,
  {
    host: process.env.AUTH_DB_HOST,
    port: process.env.AUTH_DB_PORT,
    dialect: "postgres",
    logging: false,
  },
);

// Define Student model
const Student = sequelize.define(
  "Student",
  {
    roll_number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hosteller: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "students",
    timestamps: false,
  },
);

async function seedStudents() {
  try {
    await sequelize.sync();

    const hashedPassword = await bcrypt.hash("hostel123", 10);

    const students = [];

    for (let i = 1; i <= 500; i++) {
      students.push({
        roll_number: 1000 + i,
        name: `Student${i}`,
        email: `student${i}@gla.ac.in`,
        password: hashedPassword,
        year: `${(i % 4) + 1}`,
        gender: i % 2 === 0 ? "male" : "female",
        hosteller: i <= 350,
      });
    }

    await Student.bulkCreate(students);

    console.log("500 students inserted successfully ✅");
    process.exit();
  } catch (error) {
    console.error("Seeding failed ❌", error);
    process.exit(1);
  }
}

seedStudents();
