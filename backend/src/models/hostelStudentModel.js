import { DataTypes } from "sequelize";
import hostelSequelize from "../config/hostelDatabase.js";

const HostelStudent = hostelSequelize.define(
  "HostelStudent",
  {
    roll_number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    year: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    room_allocated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    block: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    room_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "hostel_students",
    timestamps: false,
  },
);

export default HostelStudent;
