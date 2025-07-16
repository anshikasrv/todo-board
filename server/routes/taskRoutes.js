import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getUserTasks,
  updateTaskStatus,
  createTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", verifyToken, getUserTasks);
router.put("/:id/status", verifyToken, updateTaskStatus);
router.post("/", verifyToken, createTask);

export default router;
