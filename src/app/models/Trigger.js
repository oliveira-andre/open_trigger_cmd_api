import { DataTypes, Model } from 'sequelize';

import sequelize from './index';

class Trigger extends Model {}

Trigger.init({
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  command: {
    allowNull: false,
    type: DataTypes.STRING
  },
  voice: {
    allowNull: false,
    type: DataTypes.STRING
  },
}, { sequelize });

Trigger.associate = (models) => {
  Trigger.belongsTo(models.User);
}

export default Trigger;
