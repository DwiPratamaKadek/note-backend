const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('note', {
    id_note: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user'
      }
    },
    id_priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'priority',
        key: 'id_priority'
      }
    }
  }, {
    sequelize,
    tableName: 'note',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_note" },
        ]
      },
      {
        name: "fk_note_user",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "fk_note_priority",
        using: "BTREE",
        fields: [
          { name: "id_priority" },
        ]
      },
    ]
  });
};
