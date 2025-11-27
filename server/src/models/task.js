const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM('todo','inprogress','done'), defaultValue: 'todo' },
    employeeId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    timestamps: true,
    tableName: 'tasks'
  });
};