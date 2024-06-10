"use strict";
const { Model } = require("sequelize");

// too redundant with application so might
module.exports = (sequelize, DataTypes) => {
  class LeaseAgreement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LeaseAgreement.belongsTo(models.User, {
        foreignKey: "tenant_id",
        as: "user",
      });
      LeaseAgreement.belongsTo(models.House, {
        foreignKey: "house_id",
        as: "house",
      });
      LeaseAgreement.hasOne(models.PayrollLetter, {
        foreignKey: "lease_id",
        as: "payrollLetter",
      });
    }
  }

  LeaseAgreement.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      spouse_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      signature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      house_id: {
        type: DataTypes.UUID,
        references: {
          model: "House",
          key: "house_id",
        },
        allowNull: false,
      },
      tenant_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "user_id",
        },
        allowNull: false,
      },
      application_id: {
        type: DataTypes.UUID,
        references: {
          model: "Application",
          key: "application_id",
        },
        allowNull: false,
      },
      team_leader_signature: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "LeaseAgreement",
      tableName: "leaseagreements",
    }
  );

  return LeaseAgreement;
};

// before creating entry make sure user has no active leases & his role is applicant
// or if it is transfer -> inform them to send home return request // move out then after lease agreement status has been terminated

// house onboarding process --> sign lease -- approve lease -- approve payroll letter -- accept keys -- request move in

//  request house return -- request move out

// sign lease then creates payroll letter by default
// You can request to move in (link) --
//

// tenant - maintenance, view lease, view payroll, move in/ out, return house

// expiry date, terminate lease agreement (kick out tenant --
