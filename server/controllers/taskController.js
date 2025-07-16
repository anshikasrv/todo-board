import Task from "../models/Task.js";
import Log from "../models/Log.js";

// GET tasks for logged-in user
export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ tasks });
  } catch (err) {
    console.error(" Error fetching tasks:", err.message);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// PUT update task status
export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });

    try {
      await Log.create({
        user: req.user.id,
        action: `Changed status to "${task.status}" for task "${task.title}"`,
        timestamp: new Date(),
      });
    } catch (logErr) {
      console.warn(" Log creation failed:", logErr.message);
    }

    res.status(200).json({ task });
  } catch (err) {
    console.error(" Error updating task status:", err.message);
    res.status(500).json({ message: "Error updating task" });
  }
};

// POST create a new task
export const createTask = async (req, res) => {
  const { title, status } = req.body;

  try {
    const task = await Task.create({
      title,
      status,
      user: req.user.id,
    });

    try {
      await Log.create({
        user: req.user.id,
        action: `Added "${task.title}" to ${task.status}`,
        timestamp: new Date(),
      });
    } catch (logErr) {
      console.warn(" Log creation failed:", logErr.message);
    }

    res.status(201).json({ task });
  } catch (err) {
    console.error(" Error creating task:", err.message);
    res.status(500).json({ message: "Task creation failed" });
  }
};
