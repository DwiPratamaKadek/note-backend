const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const priority =  sequelize.define('priority', {
    id_priority: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, 
    //index untuk mempercepat 
  {
    sequelize,
    tableName: 'priority',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_priority" },
        ]
      },
    ]
  });

  priority.associate = (models) => {
    priority.hasMany(models.note, {foreignKey: 'id_note'})
  }

  return priority

};
