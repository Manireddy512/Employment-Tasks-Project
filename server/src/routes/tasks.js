const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({ include: { assignedTo: true } });
  res.json(tasks);
});

// Create task
router.post('/', async (req, res) => {
  const { title, assignedTo, status } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        employeeId: assignedTo || null,
        status: status || 'Pending',
      },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task
router.patch('/:id', async (req, res) => {
  const { assignedTo, status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: {
        employeeId: assignedTo,
        status,
      },
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
