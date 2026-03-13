import { DataTypes } from "sequelize";
import hostelSequelize from "../config/hostelDatabase.js";

const HostelStudent = hostelSequelize.define(
  "HostelStudent",
  {
    roll_number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    room_allocated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    hostel_id: {
      type: DataTypes.INTEGER,
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
