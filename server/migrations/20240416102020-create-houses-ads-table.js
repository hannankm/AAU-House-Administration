"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("houses", {
      house_id: {
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
        allowNull: false,
      },
      block: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      floor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      bed_cap: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      woreda: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kebele: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      house_number: {
        type: Sequelize.STRING,
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

    await queryInterface.createTable("advertisements", {
      ad_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      post_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      application_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      application_deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tentative_result_announcement: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      final_result_announcement: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.createTable("houseadvertisements", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      ad_id: {
        type: Sequelize.UUID,
        references: {
          model: "advertisements",
          key: "ad_id",
        },
        onDelete: "CASCADE",
      },
      house_id: {
        type: Sequelize.UUID,
        references: {
          model: "houses",
          key: "house_id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("advertisements");
    await queryInterface.dropTable("houseadvertisements");
    await queryInterface.dropTable("houses");
  },
};
