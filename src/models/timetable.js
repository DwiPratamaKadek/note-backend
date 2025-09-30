const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timetable', {
    id_timetable: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id_note: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'note',
        key: 'id_note'
      }
    }
  }, {
    sequelize,
    tableName: 'timetable',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_timetable" },
        ]
      },
      {
        name: "fk_timetable_note",
        using: "BTREE",
        fields: [
          { name: "id_note" },
        ]
      },
    ]
  });
};
