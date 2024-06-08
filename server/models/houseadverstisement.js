"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HouseAdvertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HouseAdvertisement.belongsTo(models.House, {
        foreignKey: "house_id",
        onDelete: "CASCADE",
      });
      HouseAdvertisement.belongsTo(models.Advertisement, {
        foreignKey: "ad_id",
        onDelete: "CASCADE",
      });
      HouseAdvertisement.hasMany(models.Application, {
        foreignKey: "HouseAdvertisementId",
        as: "applications",
      });
    }
  }
  HouseAdvertisement.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ad_id: {
        type: DataTypes.UUID,
        references: {
          model: "House",
          key: "house_id",
        },
      },
      house_id: {
        type: DataTypes.UUID,
        references: {
          model: "Advertisement",
          key: "ad_id",
        },
      },
    },
    {
      sequelize,
      modelName: "HouseAdvertisement",
      tableName: "houseadvertisements",
    }
  );
  return HouseAdvertisement;
};
