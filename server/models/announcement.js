"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Announcement.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
      });
    }
  }

  Announcement.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "Announcement",
    }
  );

  return Announcement;
};
