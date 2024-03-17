"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Announcements", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: "Users", // Assuming your User model is named 'User'
          key: "user_id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      // Add the foreign key
    });

    // Add an index on the foreign key for optimization
    await queryInterface.addIndex("Announcements", ["UserId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Announcements");
  },
};
