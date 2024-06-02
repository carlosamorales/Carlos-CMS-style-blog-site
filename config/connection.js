const Sequelize = require('sequelize');
const config = require('./config');
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

let sequelize;

if (configEnv.use_env_variable) {
  sequelize = new Sequelize(process.env[configEnv.use_env_variable], configEnv);
} else {
  sequelize = new Sequelize(
    configEnv.database,
    configEnv.username,
    configEnv.password,
    {
      host: configEnv.host,
      dialect: configEnv.dialect,
      port: configEnv.port,
    }
  );
}

module.exports = sequelize;
