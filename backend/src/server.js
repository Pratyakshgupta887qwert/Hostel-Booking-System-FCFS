import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import authSequelize from "./config/authDatabase.js";
import hostelSequelize from "./config/hostelDatabase.js";
import HostelStudent from "./models/hostelStudentModel.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await authSequelize.authenticate();
    console.log("Auth DB connected successfully ✅");

    await hostelSequelize.authenticate();
    console.log("Hostel DB connected successfully ✅");

    await HostelStudent.sync();
    console.log("HostelStudent table synced ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Auth DB connection failed ❌");
    console.error(error);
    process.exit(1);
  }
}

startServer();
