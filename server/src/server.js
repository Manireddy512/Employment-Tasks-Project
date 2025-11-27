const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error('Startup error', err);
  }
})();