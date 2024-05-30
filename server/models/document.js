"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.Application, {
        foreignKey: "application_id",
        as: "application",
      });
    }
  }

  Document.init(
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
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // pending, verified, rejected, in progress
      verification_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified_by: {
        type: DataTypes.UUID,
        references: {
          model: "User", // Assuming your User model is named 'User'
          key: "user_id",
        },
        allowNull: true,
      },
      application_id: {
        type: DataTypes.UUID,
        references: {
          model: "Application", // Assuming your User model is named 'User'
          key: "application_id",
        },
        allowNull: false,
        field: "application_id",
      },
    },
    {
      sequelize,
      modelName: "Document",
      tableName: "documents",
    }
  );

  return Document;
};
