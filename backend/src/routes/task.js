// routes/task.js

import express from 'express';
import Task from '../models/task.js';
import User from '../models/user.js';
import AuthenticateToken from '../routes/auth.js'; // ✅ Correct import path

const router = express.Router();

// Create Task
router.post('/create-task', AuthenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const userId = req.user.id; // Get user ID from token

    const newTask = new Task({ title, desc });
    const savedTask = await newTask.save();

    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

    res.status(200).json({ message: 'Task Created Successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});




// Get All Tasks
router.get('/get-all-tasks', AuthenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await User.findById(userId).populate({
      path: 'tasks',
      options: { sort: { createdAt: -1 } },
    });

    res.status(200).json({ data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// Update Task
router.put('/update-task/:id', AuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    await Task.findByIdAndUpdate(id, { title, desc });

    res.status(200).json({ message: 'Task Updated Successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// Delete Task
router.delete('/delete-task/:id', AuthenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    await Task.findByIdAndDelete(taskId);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

    res.status(200).json({ message: 'Task Deleted Successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// Toggle Important Task
router.put('/update-imp-task/:id', AuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const newStatus = !taskData.important;

    await Task.findByIdAndUpdate(id, { important: newStatus });

    res.status(200).json({ message: 'Important Status Updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// Toggle Completed Task
router.put('/update-comp-task/:id', AuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskData = await Task.findById(id);
    const newStatus = !taskData.complete;

    await Task.findByIdAndUpdate(id, { complete: newStatus });

    res.status(200).json({ message: 'Task updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// Get Important Tasks
router.get('/get-imp-tasks', AuthenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await User.findById(userId).populate({
      path: 'tasks',
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });

    res.status(200).json({ tasks: userData.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// Get Completed Tasks
router.get('/get-comp-tasks', AuthenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await User.findById(userId).populate({
      path: 'tasks',
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });

    res.status(200).json({ tasks: userData.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// Get Incomplete Tasks
router.get('/get-incomp-tasks', AuthenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await User.findById(userId).populate({
      path: 'tasks',
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });

    res.status(200).json({ tasks: userData.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

export default router;
