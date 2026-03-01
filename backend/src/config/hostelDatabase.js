import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const hostelSequelize = new Sequelize(
  "hostel_db",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
  },
);

export default hostelSequelize;
