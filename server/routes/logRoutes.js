import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import Log from "../models/Log.js";

const router = express.Router();

// GET /api/logs — fetch logs for current user
router.get("/", verifyToken, async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("user", "name");
    res.status(200).json({ logs });
  } catch {
    res.status(500).json({ message: "Failed to fetch activity logs" });
  }
});

export default router;
