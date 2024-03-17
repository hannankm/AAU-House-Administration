"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Complaint.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Complaint.belongsTo(models.Application, {
        foreignKey: "application_id",
        as: "application",
      });
    }
  }

  Complaint.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "user_id",
        },
        allowNull: false,
      },
      application_id: {
        type: DataTypes.UUID,
        references: {
          model: "Application",
          key: "application_id",
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Complaint",
    }
  );

  return Complaint;
};

// temporary result announcement date
