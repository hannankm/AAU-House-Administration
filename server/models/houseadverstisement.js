"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HouseAdverstisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HouseAdverstisement.belongsTo(models.House, {
        foreignKey: "house_id",
        onDelete: "CASCADE",
      });
      HouseAdverstisement.belongsTo(models.Adverstisement, {
        foreignKey: "ad_id",
        onDelete: "CASCADE",
      });
      HouseAdverstisement.hasMany(models.Application);
    }
  }
  HouseAdverstisement.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ad_id: {
        type: DataTypes.UUID,
        references: {
          model: "Houses",
          key: "house_id",
        },
      },
      house_id: {
        type: DataTypes.UUID,
        references: {
          model: "Adverstisements",
          key: "ad_id",
        },
      },
    },
    {
      sequelize,
      modelName: "HouseAdverstisement",
    }
  );
  return HouseAdverstisement;
};
