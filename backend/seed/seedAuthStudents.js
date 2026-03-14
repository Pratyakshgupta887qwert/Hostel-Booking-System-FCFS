import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { Sequelize, DataTypes } from "sequelize";

// Create Sequelize instance using Neon connection URL
const sequelize = new Sequelize(process.env.AUTH_DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
      type: DataTypes.INTEGER,
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
    await sequelize.authenticate();

    await Student.sync({ force: true });

    const hashedPassword = await bcrypt.hash("student123", 10);

    const students = [];

    for (let i = 1; i <= 500; i++) {
      students.push({
        roll_number: 1000 + i,
        name: `Student${i}`,
        email: `student${i}@gla.ac.in`,
        password: hashedPassword,
        year: Math.floor(Math.random() * 4) + 1,
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
