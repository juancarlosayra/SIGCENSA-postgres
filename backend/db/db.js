import { Sequelize } from 'sequelize';

// Example connection to PostgreSQL; adjust for your DB and credentials.
const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_DB_USER, process.env.PG_DB_PASSWORD, {
  host: process.env.PG_DB_HOST,
  dialect: 'postgres' // or 'mysql', 'sqlite', 'mariadb', 'mssql'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
