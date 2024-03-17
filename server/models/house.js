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
      House.belongsToMany(models.Adverstisement, {
        through: "HouseAdverstisement",
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      site: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      block: DataTypes.STRING,
      floor: DataTypes.STRING,
      rent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      bed_cap: DataTypes.INTEGER,
      woreda: DataTypes.STRING,
      kebele: DataTypes.INTEGER,
      house_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "House",
    }
  );
  return House;
};
