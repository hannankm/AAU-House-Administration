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
        foreignKey: "complaintant_id",
        as: "complaintant",
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
        // miscalculation, fake entries,
        type: DataTypes.STRING,
        allowNull: true,
      },
      complaintant_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "user_id",
        },
        allowNull: false,
      },
      application_id: {
        // enter the application id of yours or the you have doubts on
        type: DataTypes.UUID,
        references: {
          model: "Application",
          key: "application_id",
        },
        allowNull: true,
      },
      tenant_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "user_id",
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Complaint",
      tableName: "complaints",
    }
  );

  return Complaint;
};

// temporary result announcement date in
