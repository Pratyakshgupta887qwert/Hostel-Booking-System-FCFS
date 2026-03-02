import { Sequelize } from "sequelize";

const hostelSequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default hostelSequelize;

// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const hostelSequelize = new Sequelize(
//   "hostel_db",
//   process.env.AUTH_DB_USER,
//   process.env.AUTH_DB_PASSWORD,
//   {
//     host: process.env.AUTH_DB_HOST,
//     port: process.env.AUTH_DB_PORT,
//     dialect: "postgres",
//     logging: false,
//   },
// );

// export default hostelSequelize;
