const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    token: {
      type: DataTypes.TEXT(255),
      allowNull: true
    }
  }, {
    hooks : { 
      // fungsi dari hooks ini untuk melakukan hash secara otomatis 
      beforeCreate : async (user) => {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
      }
    },
    sequelize,
    tableName: 'user',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });

  // user.prototype.validPassword = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  // };

  user.associate = (models) => {
    user.hasMany(models.note,{foreignKey: 'id_user'})
  }


  return user
};
