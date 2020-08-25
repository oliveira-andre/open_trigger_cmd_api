import { DataTypes, Model } from 'sequelize';

import sequelize from './index';

class Trigger extends Model {}

Trigger.init({
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      async isUniqueByUser() {
        if (this.name && this.userId) {
          const trigger = await Trigger.findOne({
            where: { name: this.name, userId: this.userId }
          });

          if (trigger) {
            throw new Error('Name needs to be unique');
          }
        }
      }
    },
  },
  command: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  voice: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      async isUniqueByUser() {
        if (this.voice && this.userId) {
          const trigger = await Trigger.findOne({
            where: { voice: this.voice, userId: this.userId }
          });

          if (trigger) {
            throw new Error('Voice needs to be unique');
          }
        }
      }
    },
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}, { sequelize });

Trigger.associate = (models) => {
  Trigger.belongsTo(models.User);
}

export default Trigger;
