const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const note = sequelize.define('note', {
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
    // Fk 
    id_user: {  
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    },
    id_priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'priority',
        key: 'id_priority'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    },
    
  },{ // index untuk membatu cepat 
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

  note.associate = (models) => {
    note.belongsTo(models.user, {foreignKey: 'id_user'})
    note.belongsTo(models.priority, {foreignKey: 'id_priority'})
    note.belongsToMany(models.tag, {
      through: models.note_tag,
      foreignKey: 'id_note',
      otherKey: 'id_tag'
    })
  }

  return note
  

};
