import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { Sequelize, DataTypes } from "sequelize";

// Create Sequelize instance for Auth DB
const sequelize = new Sequelize(
  "auth_db",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  },
);

// Define Admin model
const Admin = sequelize.define(
  "Admin",
  {
    employee_id: {
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "admins",
    timestamps: false,
  },
);

async function seedAdmins() {
  try {
    await Admin.sync({ force: true });

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admins = [];

    for (let i = 1; i <= 10; i++) {
      admins.push({
        employee_id: 100 + i,
        name: i === 1 ? "Main Admin" : `Sub Admin ${i - 1}`,
        email: i === 1 ? "mainadmin@gla.ac.in" : `subadmin${i - 1}@gla.ac.in`,
        password: hashedPassword,
        role: i === 1 ? "main_admin" : "sub_admin",
      });
    }

    await Admin.bulkCreate(admins);

    console.log("10 admins inserted successfully ✅");
    console.log("Default password for all admins: admin123");

    process.exit();
  } catch (error) {
    console.error("Seeding failed ❌", error);
    process.exit(1);
  }
}

seedAdmins();
