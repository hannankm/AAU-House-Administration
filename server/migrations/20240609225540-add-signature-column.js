"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("LeaseAgreements", "team_leader_signature", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("PayrollLetters", "team_leader_signature", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("MovePermits", "team_leader_signature", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "LeaseAgreements",
      "team_leader_signature"
    );
    await queryInterface.removeColumn(
      "PayrollLetters",
      "team_leader_signature"
    );

    await queryInterface.removeColumn("MovePermits", "team_leader_signature");
  },
};
