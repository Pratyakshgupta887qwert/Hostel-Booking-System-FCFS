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
      validate: {
        min: 1,
        max: 4,
      },
    },

    gender: {
      type: DataTypes.ENUM("male", "female"),
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
