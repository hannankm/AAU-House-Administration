"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Step 1: Add a temporary boolean column
      await queryInterface.addColumn(
        "applications",
        "document_verified_temp",
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        { transaction }
      );

      // Step 2: Copy data from the string column to the temporary boolean column
      await queryInterface.sequelize.query(
        `UPDATE "applications" 
         SET "document_verified_temp" = 
         CASE 
           WHEN "document_verified" = 'true' THEN true 
           WHEN "document_verified" = 'false' THEN false 
           ELSE false 
         END`,
        { transaction }
      );

      // Step 3: Drop the original string column
      await queryInterface.removeColumn("applications", "document_verified", {
        transaction,
      });

      // Step 4: Rename the temporary column to the original column name
      await queryInterface.renameColumn(
        "applications",
        "document_verified_temp",
        "document_verified",
        { transaction }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Step 1: Add the original string column back
      await queryInterface.addColumn(
        "applications",
        "document_verified_temp",
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "false",
        },
        { transaction }
      );

      // Step 2: Copy data from the boolean column to the string column
      await queryInterface.sequelize.query(
        `UPDATE "applications" 
         SET "document_verified_temp" = 
         CASE 
           WHEN "document_verified" = true THEN 'true' 
           ELSE 'false' 
         END`,
        { transaction }
      );

      // Step 3: Drop the boolean column
      await queryInterface.removeColumn("applications", "document_verified", {
        transaction,
      });

      // Step 4: Rename the temporary column to the original column name
      await queryInterface.renameColumn(
        "applications",
        "document_verified_temp",
        "document_verified",
        { transaction }
      );
    });
  },
};
