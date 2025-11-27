const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const employeesRouter = require('./routes/employees');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/employees', employeesRouter);
app.use('/api/tasks', tasksRouter);

app.get('/api/health', (req, res) => res.json({ ok: true }));

module.exports = app;