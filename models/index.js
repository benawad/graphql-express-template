import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  },
);

const db = {
  User: sequelize.import('./user'),
  Board: sequelize.import('./board'),
  Suggestion: sequelize.import('./suggestion'),
  FbAuth: sequelize.import('./FbAuth'),
  LocalAuth: sequelize.import('./localAuth'),
};

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default db;
