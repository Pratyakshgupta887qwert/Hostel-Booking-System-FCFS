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
import { upload } from "../middleware/uploadMiddleware.js";
import { previewRooms, confirmRooms } from "../controllers/roomController.js";

const router = express.Router();

router.post("/hostels", verifyToken, requireMainAdmin, createHostel);

router.post(
  "/hostels/:id/years",
  verifyToken,
  requireMainAdmin,
  addAllowedYears,
);
router.get("/hostels", verifyToken, requireAdmin, getAllHostels);

router.post(
  "/hostels/:id/rooms/preview",
  verifyToken,
  requireMainAdmin,
  upload.single("file"),
  previewRooms,
);

router.post(
  "/hostels/:id/rooms/confirm",
  verifyToken,
  requireMainAdmin,
  upload.single("file"),
  confirmRooms,
);

export default router;
