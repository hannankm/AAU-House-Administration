"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      House.belongsToMany(models.Advertisement, {
        through: "HouseAdvertisement",
        as: "advertisements",
        foreignKey: "house_id",
      });
    }
  }
  House.init(
    {
      house_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        // federal or aau
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        // occupied, empty,
        type: DataTypes.STRING,
        allowNull: false,
      },
      site: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      block: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      floor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      bed_cap: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      woreda: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kebele: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      house_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "House",
      tableName: "houses",
    }
  );
  return House;
};
