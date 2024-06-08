"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("applications", "is_active_position", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    });
    await queryInterface.addColumn("applications", "years_of_experience", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("applications", "is_active_position");
    await queryInterface.removeColumn("applications", "years_of_experience");
  },
};
