import express from "express";
import { getEligibleHostels } from "../controllers/studentHostelController.js";
import { verifyToken, requireStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/hostels", verifyToken, requireStudent, getEligibleHostels);

export default router;
