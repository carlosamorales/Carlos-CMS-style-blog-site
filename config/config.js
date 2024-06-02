// config.js

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    // Additional Sequelize configurations for the development environment
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    // Additional Sequelize configurations for the test environment
  },
  production: {
    use_env_variable: 'JAWSDB_URL', // Heroku provides this when you add JAWSDB
    dialect: 'mysql',
    // Sequelize expects a single connection string for production, 
    // so no other settings like username, password, etc., are necessary here
  }
};
