"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MovePermit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovePermit.belongsTo(models.User, {
        foreignKey: "tenant_id",
        as: "user",
      });
    }
  }

  // college/ department managing director, insitute, name, site, house number, current month & year, rent,
  // lease -> tenant and house id - based on application

  MovePermit.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      status: {
        // pending, accepted
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        // move in or out
        type: DataTypes.STRING,
        allowNull: false,
      },
      tenant_id: {
        // then see the lease agreement they currently have active to get lease agreement.
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
      modelName: "MovePermit",
      tableName: "movepermits",
    }
  );

  return MovePermit;
};

// move in requested by tenant
// move out letter provided only if house return inspection is approved
// on request generate file to be exported
