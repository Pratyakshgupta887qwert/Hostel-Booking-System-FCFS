import { DataTypes } from "sequelize";
import hostelSequelize from "../config/hostelDatabase.js";

const Room = hostelSequelize.define(
  "Room",
  {
    hostel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    room_number: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    total_beds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available_beds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_ac: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "rooms",
    timestamps: false,
  },
);

export default Room;
