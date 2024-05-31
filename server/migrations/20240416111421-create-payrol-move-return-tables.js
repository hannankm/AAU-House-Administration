"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payrollletters", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lease_id: {
        type: Sequelize.UUID,
        references: {
          model: "leaseagreements",
          key: "id",
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
    });

    await queryInterface.createTable("movepermits", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tenant_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
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
    });
    await queryInterface.createTable("housereturns", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_range_for_inspection: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tenant_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payrollletters");
    await queryInterface.dropTable("movepermits");
    await queryInterface.dropTable("housereturns");
  },
};
