const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    const formattedTasks = tasks.map((task) => ({
      id: task._id,
      attributes: {
        title: task.title,
        description: task.description,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        __v: task.__v,
      },
    }));
    res.json({ data: formattedTasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single task
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newTask = await task.save();
    res.status(201).json({
      id: newTask._id,
      attributes: {
        title: newTask.title,
        description: newTask.description,
        createdAt: newTask.createdAt,
        updatedAt: newTask.updatedAt,
        __v: newTask.__v,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// patch update a task
router.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.updatedAt = Date.now();

    const updatedTask = await task.save();
    res.json({
      id: updatedTask._id,
      attributes: {
        title: updatedTask.title,
        description: updatedTask.description,
        createdAt: updatedTask.createdAt,
        updatedAt: updatedTask.updatedAt,
        __v: updatedTask.__v,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
