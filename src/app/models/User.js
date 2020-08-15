import bycript from  'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequlize) {
    super.init({
      email: Sequelize.STRING,
      created_at: Sequelize.DATE,
      created_at: Sequelize.DATE,
    }, { sequelize });

    return this;
  }

  checkPassword(password){
    return bcrypt.compare(password, this.encrypted_password);
  }
};

export default User;
