import express from "express";
import {
  studentLogin,
  getStudentProfile,
} from "../controllers/studentAuthController.js";
import { verifyToken, requireStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", studentLogin);
router.get("/profile", verifyToken, requireStudent, getStudentProfile);

export default router;
