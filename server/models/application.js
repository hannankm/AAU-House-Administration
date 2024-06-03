"use strict";
const { Model } = require("sequelize");
// is it better to have temporary grade and final grade then have rank calculated
// spouse equally home tenant
// status - waitlisted

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
        foreignKey: "applicant_id",
        as: "applicant",
      });

      Application.belongsTo(models.HouseAdvertisement, {
        foreignKey: "HouseAdvertisementId",
        as: "applications",
      });

      Application.hasMany(models.Document, {
        foreignKey: "application_id",
        as: "documents",
      });
    }
  }

  Application.init(
    {
      application_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      spouse_full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_spouse_staff: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      // spouse email -- then map id from email cause unlikely that the user will know their id
      spouse_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      family_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        // submitted, disqualified, documents verified, waitlisted, closed, won
        type: DataTypes.STRING,
        allowNull: false,
      },
      college_department: {
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
        // new or transfer applicant
        type: DataTypes.STRING,
        allowNull: false,
      },
      signature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      disablity: {
        // None or write it out
        type: DataTypes.STRING,
        allowNull: true,
      },
      additional_position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document_verified: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      temporary_grade: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      final_grade: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      applicant_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "user_id",
        },
        allowNull: false,
      },
      HouseAdvertisementId: {
        type: DataTypes.UUID,
        references: {
          model: "HouseAdvertisement",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Application",
      tableName: "applications",
    }
  );

  return Application;
};

// generate result for each application based on req then store grade (tentative) - sort desceding then store final grade - store rank?? or no need just grade it then store as index sorted.
// status -- in progress, submitted, document verfication pending, document verified, tentative result announced, disqualified, final result announced, waitlisted, not selected, selected/ winner.

// while ranking filter out disqaluified and where documents verified == true,

// for waitlist applicant preferences -- site, floor, type, bed cap

// marital status checkbox on frontend if true display three spouse feilds else dont
// the other

// you have started an application elsewhere are yiu sure you want to start a new one if status is saved/started

// verify docs by user or type of doc
