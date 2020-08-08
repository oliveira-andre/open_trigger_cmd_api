import Sequelize from 'sequelize';

import dbConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
