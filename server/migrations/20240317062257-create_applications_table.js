"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Applications", {
      application_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      spouse_full_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_spouse_staff: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      spouse_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      family_size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      academic_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      office_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      signature: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      disablity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      additional_position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      document_verified: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      temporary_rank: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      final_rank: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      applicant_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
      },
      houseAd_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "HouseAdverstisements",
          key: "id",
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
    await queryInterface.dropTable("Applications");
  },
};
