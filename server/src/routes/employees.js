const express = require('express');
const router = express.Router();
const { Employee, Task } = require('../models');

router.get('/', async (req, res) => {
  const employees = await Employee.findAll({ include: [{ model: Task, as: 'tasks' }] });
  res.json(employees);
});

router.get('/:id', async (req, res) => {
  const emp = await Employee.findByPk(req.params.id, { include: ['tasks'] });
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  res.json(emp);
});

router.post('/', async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  await emp.update(req.body);
  res.json(emp);
});

router.delete('/:id', async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  await emp.destroy();
  res.json({ success: true });
});

module.exports = router;