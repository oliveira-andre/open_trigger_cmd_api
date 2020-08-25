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
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.VIRTUAL,
    allowNull: false
  },
  encrypted_password: {
    type: DataTypes.STRING,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, { sequelize });

User.associate = (models) => {
  User.hasOne(models.Trigger);
}

User.beforeCreate(async (user) => {
  if (user.password) {
    user.encrypted_password = await bcrypt.hash(user.password, 8);
  }
});

export default User;
