"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Advertisement.belongsToMany(models.House, {
        through: "HouseAdvertisement",
        as: "houses",
        foreignKey: "ad_id",
      });
    }
  }
  Advertisement.init(
    {
      ad_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      post_date: { type: DataTypes.DATE, allowNull: false },
      application_start_date: { type: DataTypes.DATE, allowNull: false },
      application_deadline: { type: DataTypes.DATE, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      notes: { type: DataTypes.STRING, allowNull: true },
      // house_count: { type: DataTypes.INTEGER, allowNull: false },
      tentative_result_announcement: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      final_result_announcement: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Advertisement",
      tableName: "advertisements",
    }
  );
  return Advertisement;
};
