import { DataTypes } from "sequelize";
import hostelSequelize from "../config/hostelDatabase.js";

const HostelAllowedYear = hostelSequelize.define(
  "HostelAllowedYear",
  {
    hostel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        min: 1,
        max: 4,
      },
    },
  },
  {
    tableName: "hostel_allowed_years",
    timestamps: false,
  },
);

export default HostelAllowedYear;
