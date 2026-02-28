import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.AUTH_DB_NAME,
  process.env.AUTH_DB_USER,
  process.env.AUTH_DB_PASSWORD,
  {
    host: process.env.AUTH_DB_HOST,
    port: process.env.AUTH_DB_PORT,
    dialect: "postgres",
    logging: false,
  },
);

async function resetDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to Auth DB ✅");

    await sequelize.drop();
    console.log("All tables dropped successfully 🗑️");

    console.log("Database reset complete ✅");
    process.exit();
  } catch (error) {
    console.error("Reset failed ❌", error);
    process.exit(1);
  }
}

resetDatabase();
