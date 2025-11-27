const express = require('express');
const router = express.Router();
const { Task } = require('../models');

router.get('/', async (req, res) => {
  const where = {};
  if (req.query.employeeId) where.employeeId = req.query.employeeId;
  const tasks = await Task.findAll({ where });
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  await task.update(req.body);
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  await task.destroy();
  res.json({ success: true });
});

module.exports = router;