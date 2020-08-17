import Sequelize from 'sequelize';
import { resolve } from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(
  resolve(__dirname, '..', '..', 'config', 'database.json')
)[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
