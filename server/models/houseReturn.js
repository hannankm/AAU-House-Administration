"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class HouseReturn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HouseReturn.belongsTo(models.User, {
        foreignKey: "tenant_id",
        as: "user",
      });
    }
  }

  // college/ department managing director, insitute, name, site, house number, current month & year, rent,
  // lease -> tenant and house id

  HouseReturn.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      status: {
        // pending, inspection date set, approved, accepted, returned
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_range_for_inspection: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tenant_id: {
        // then see the lease agreement they currently have active to get lease agreement.
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "user_id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "HouseReturn",
      tableName: "housereturns",
    }
  );

  return HouseReturn;
};

// result -> lease terminated, house available, & user role & spouse role applicant

// move out after house is inspected then return house/ keys
// add retunrn date
// when approved get lease id by active tenant id then make house empty & set return date & status to approved
// get house return where tenant id = applicant id and status = returned
