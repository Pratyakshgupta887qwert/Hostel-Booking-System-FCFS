import { DataTypes } from "sequelize";
import authSequelize from "../config/authDatabase.js";

const Student = authSequelize.define(
  "Student",
  {
    roll_number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    year: DataTypes.STRING,
    gender: DataTypes.STRING,
    hosteller: DataTypes.BOOLEAN,
  },
  {
    tableName: "students",
    timestamps: false,
  },
);

export default Student;
