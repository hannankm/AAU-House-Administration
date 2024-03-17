"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Adverstisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Adverstisement.belongsToMany(models.House, {
        through: "HouseAdverstisement",
        as: "houses",
        foreignKey: "ad_id",
      });
    }
  }
  Adverstisement.init(
    {
      ad_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      post_date: DataTypes.DATE,
      application_start_date: DataTypes.DATE,
      application_deadline: DataTypes.DATE,
      status: DataTypes.STRING,
      notes: DataTypes.STRING,
      house_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Adverstisement",
    }
  );
  return Adverstisement;
};
