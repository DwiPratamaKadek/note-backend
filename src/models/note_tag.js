const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('note_tag', {
    id_note: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'note',
        key: 'id_note'
      }
    },
    id_tag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tag',
        key: 'id_tag'
      }
    }
  }, {
    sequelize,
    tableName: 'note_tag',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_note" },
          { name: "id_tag" },
        ]
      },
      {
        name: "fk_notetag_tag",
        using: "BTREE",
        fields: [
          { name: "id_tag" },
        ]
      },
    ]
  });
};
