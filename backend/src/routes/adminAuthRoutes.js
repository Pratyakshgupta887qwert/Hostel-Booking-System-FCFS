import express from "express";
import {
  adminLogin,
  getAdminProfile,
} from "../controllers/adminAuthController.js";
import { verifyToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/profile", verifyToken, requireAdmin, getAdminProfile);

export default router;
