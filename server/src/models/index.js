const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'database.sqlite'),
  logging: false,
});

const Employee = require('./employee')(sequelize);
const Task = require('./task')(sequelize);

Employee.hasMany(Task, { as: 'tasks', foreignKey: 'employeeId', onDelete: 'CASCADE' });
Task.belongsTo(Employee, { as: 'employee', foreignKey: 'employeeId' });

module.exports = { sequelize, Employee, Task };