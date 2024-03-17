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
      Document.belongsTo(models.Document);
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
      verification_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      application_id: {
        type: DataTypes.UUID,
        references: {
          model: "Application", // Assuming your User model is named 'User'
          key: "application_id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Document",
    }
  );

  return Document;
};
