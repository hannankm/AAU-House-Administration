"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Houses", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      site: {
        type: Sequelize.STRING,
      },
      block: {
        type: Sequelize.STRING,
      },
      floor: {
        type: Sequelize.STRING,
      },
      rent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      bed_cap: {
        type: Sequelize.INTEGER,
      },
      woreda: {
        type: Sequelize.STRING,
      },
      kebele: {
        type: Sequelize.INTEGER,
      },
      house_number: {
        type: Sequelize.STRING,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Houses");
  },
};
