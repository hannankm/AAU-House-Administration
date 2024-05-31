"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MaintenanceRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MaintenanceRequest.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
      });
    }
  }

  MaintenanceRequest.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      room: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      problem_faced: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.UUID,
        references: {
          model: "User", // Assuming your User model is named 'User'
          key: "user_id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MaintenanceRequest",
      tableName: "maintenancerequests",
    }
  );

  return MaintenanceRequest;
};
