import { DataTypes } from "sequelize";
import hostelSequelize from "../config/hostelDatabase.js";

const Hostel = hostelSequelize.define(
  "Hostel",
  {
    hostel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hostel_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "hostels",
    timestamps: false,
  },
);

export default Hostel;
