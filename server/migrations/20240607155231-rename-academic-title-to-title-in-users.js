"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("users", "academic_title", "title");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("users", "title", "academic_title");
  },
};
