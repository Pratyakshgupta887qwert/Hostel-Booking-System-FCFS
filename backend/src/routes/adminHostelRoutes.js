import express from "express";
import {
  createHostel,
  addAllowedYears,
  getAllHostels,
} from "../controllers/adminHostelController.js";
import {
  verifyToken,
  requireAdmin,
  requireMainAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/hostels", verifyToken, requireMainAdmin, createHostel);
router.post(
  "/hostels/:id/years",
  verifyToken,
  requireMainAdmin,
  addAllowedYears,
);
router.get("/hostels", verifyToken, requireAdmin, getAllHostels);

export default router;
