import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import authSequelize from "./config/authDatabase.js";
import hostelSequelize from "./config/hostelDatabase.js";

import "./models/index.js";

const PORT = process.env.PORT || 5000;

let server;

async function startServer() {
  try {
    await authSequelize.authenticate();
    console.log("Auth DB connected successfully ✅");

    await hostelSequelize.authenticate();
    console.log("Hostel DB connected successfully ✅");

    await hostelSequelize.sync();
    console.log("Hostel DB synced successfully ✅");

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Startup failed ❌");
    console.error(error);
    process.exit(1);
  }
}

async function shutdown() {
  try {
    if (server) {
      server.close();
    }

    await authSequelize.close();
    await hostelSequelize.close();

    process.exit(0);
  } catch (error) {
    console.error("Shutdown error ❌", error);
    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();
