"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applications", {
      application_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
      college_department: {
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
      signature: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      disablity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      additional_position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      document_verified: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      temporary_grade: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      final_grade: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      applicant_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      HouseAdvertisementId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "houseadvertisements",
          key: "id",
        },
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

    await queryInterface.createTable("documents", {
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
        type: Sequelize.STRING,
        allowNull: false,
      },
      verified_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      application_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "applications",
          key: "application_id",
        },
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

    await queryInterface.createTable("complaints", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      application_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "applications",
          key: "application_id",
        },
      },
      tenant_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
        // enter the user email/ name of the user/ tenant have doubts on  (name, dept)
        allowNull: true,
      },
      complaintant_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
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
    await queryInterface.dropTable("applications");
    await queryInterface.dropTable("documents");
    await queryInterface.dropTable("complaints");
  },
};
