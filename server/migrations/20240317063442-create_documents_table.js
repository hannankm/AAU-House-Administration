"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Documents", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      file_path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      verification_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      application_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Applications",
          key: "application_id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Documents");
  },
};
