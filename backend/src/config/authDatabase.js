import { Sequelize } from "sequelize";

const authSequelize = new Sequelize(process.env.DATABASE_URL, {
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

export default authSequelize;

// import { Sequelize } from "sequelize";
// // import dotenv from "dotenv";

// // dotenv.config();

// const authSequelize = new Sequelize(
//   process.env.AUTH_DB_NAME,
//   process.env.AUTH_DB_USER,
//   process.env.AUTH_DB_PASSWORD,
//   {
//     host: process.env.AUTH_DB_HOST,
//     port: process.env.AUTH_DB_PORT,
//     dialect: "postgres",
//     logging: false,
//   },
// );

// export default authSequelize;
