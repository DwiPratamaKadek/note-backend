'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('note', {
      id_note: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    content: {
      type: Sequelize.STRING(500),
      allowNull: true
    },
    deadline: {
      type: Sequelize.DATE,
      allowNull: true
    },
    // Fk 
    id_user: {  
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id_user'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    },
    id_priority: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'priority',
        key: 'id_priority'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    }, 
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
    })
    //indexin aja biar cepat aahhahah
    await queryInterface.addIndex('note', ['id_user'],{
      name : 'fk_note_user'
    })

    await queryInterface.addIndex('note', ['id_priority'],{
      name : 'fk_note_priority'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('note');
  }
};
