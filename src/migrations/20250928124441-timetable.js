'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('timetable', {
      id_timetable: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      id_note: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'note',
          key: 'id_note'
        }
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

    await queryInterface.addIndex('timetable', ['id_note'], {
      name : 'fk_timetabel_note'
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('timetable')
  }
};
