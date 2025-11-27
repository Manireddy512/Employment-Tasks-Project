const { sequelize, Employee, Task } = require('./models');

(async () => {
  try {
    await sequelize.sync({ force: true });

    const alice = await Employee.create({ name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' });
    const bob = await Employee.create({ name: 'Bob Singh', email: 'bob@example.com', role: 'Designer' });

    await Task.create({ title: 'Build login page', description: 'Create login UI and validation', status: 'inprogress', employeeId: alice.id });
    await Task.create({ title: 'Design logo', description: 'Produce logo variations', status: 'todo', employeeId: bob.id });

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();