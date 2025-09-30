const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const tag =  sequelize.define('tag', {
    id_tag: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_tag: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tag',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tag" },
        ]
      },
    ]
  });

  tag.associate = (models) => {
    tag.belongsToMany(models.note, {
      through: models.note_tag,
      foreignKey: 'id_tag',
      otherKey: 'id_note'
    })
  }

  return tag
};
