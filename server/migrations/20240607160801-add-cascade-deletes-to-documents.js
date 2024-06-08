"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "documents",
      "documents_application_id_fkey"
    );

    await queryInterface.addConstraint("documents", {
      fields: ["application_id"],
      type: "foreign key",
      name: "documents_application_id_fkey",
      references: {
        table: "applications",
        field: "application_id",
      },
      onDelete: "CASCADE", // Add this line to enable cascading deletes
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "documents",
      "documents_application_id_fkey"
    );

    await queryInterface.addConstraint("documents", {
      fields: ["application_id"],
      type: "foreign key",
      name: "documents_application_id_fkey",
      references: {
        table: "applications",
        field: "application_id",
      },
    });
  },
};
