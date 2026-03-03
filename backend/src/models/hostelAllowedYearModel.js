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
    },
  },
  {
    tableName: "hostel_allowed_years",
    timestamps: false,
  },
);

export default HostelAllowedYear;
