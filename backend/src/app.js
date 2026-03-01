import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import studentAuthRoutes from "./routes/studentAuthRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.use("/api/student", studentAuthRoutes);

app.use("/api/admin", adminAuthRoutes);

export default app;
