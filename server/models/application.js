"use strict";
const { Model } = require("sequelize");
// is it better to have temporary grade and final grade then have rank calculated
// spouse equally home tenant

module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
      });
      Application.belongsTo(models.HouseAdverstisement);
      Application.hasMany(models.Document);
    }
  }

  Application.init(
    {
      application_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spouse_full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_spouse_staff: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      spouse_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      family_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academic_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      office_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      signature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      disablity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      additional_position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document_verified: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      temporary_rank: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      final_rank: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      applicant_id: {
        type: DataTypes.UUID,
        references: {
          model: "User", // Assuming your User model is named 'User'
          key: "user_id",
        },
        allowNull: false,
      },
      houseAd_id: {
        type: DataTypes.UUID,
        references: {
          model: "HouseAdverstisement", // Assuming your User model is named 'User'
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Application",
    }
  );

  return Application;
};
