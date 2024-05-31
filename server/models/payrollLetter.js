"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PayrollLetter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PayrollLetter.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
      });
    }
  }

  // college/ department "managing director", insitute, name, site, house number, current month & year, rent,
  // lease -> tenant and house id

  PayrollLetter.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lease_id: {
        type: DataTypes.UUID,
        references: {
          model: "LeaseAgreement", // Assuming your User model is named 'User'
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PayrollLetter",
      tableName: "payrollletters",
    }
  );

  return PayrollLetter;
};
