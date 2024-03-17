"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Houses", {
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

    await queryInterface.createTable("Adverstisements", {
      ad_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      post_date: {
        type: Sequelize.DATE,
      },
      application_start_date: {
        type: Sequelize.DATE,
      },
      application_deadline: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      notes: {
        type: Sequelize.STRING,
      },
      house_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.createTable("HouseAdverstisements", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      ad_id: {
        type: Sequelize.UUID,
        references: {
          model: "Adverstisements",
          key: "ad_id",
        },
        onDelete: "CASCADE",
      },
      house_id: {
        type: Sequelize.UUID,
        references: {
          model: "Houses",
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
    await queryInterface.dropTable("Adverstisements");
    await queryInterface.dropTable("HouseAdverstisements");
    await queryInterface.dropTable("Houses");
  },
};
