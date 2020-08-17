import bcrypt from  'bcryptjs';
import { DataTypes, Model } from 'sequelize';

import sequelize from './index';

class User extends Model {
  checkPassword(password) {
    return bcrypt.compare(password, this.encrypted_password);
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, { sequelize });

export default User;
