"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("leaseagreements", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      spouse_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      signature: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      house_id: {
        type: Sequelize.UUID,
        references: {
          model: "houses",
          key: "house_id",
        },
        allowNull: false,
      },

      application_id: {
        type: Sequelize.UUID,
        references: {
          model: "applications",
          key: "application_id",
        },
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

    await queryInterface.createTable("maintenancerequests", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      room: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      problem_faced: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: "users", // Assuming your User model is named 'User'
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
    await queryInterface.dropTable("leaseagreements");
    await queryInterface.dropTable("maintenancerequests");
  },
};
