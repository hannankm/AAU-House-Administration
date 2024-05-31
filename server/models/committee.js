// create user with role primary & secondary commitee & position
// give him temporary password  and email him to change paswword
// date of assignment, and position

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Committee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Committee.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
        constraints: false,
        onDelete: "CASCADE",
      });
    }
  }

  Committee.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_assignment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Committee",
      tableName: "committees",
    }
  );

  return Committee;
};

// when date has passed two years inform VP, delete committe role
// assign all comite members as it usded to be eg: head of housing and all have thier positions stated
// make them appear by default as in as recomended comite members then when clicking on add it automaticlly sends them an email like regular comite members
// then additional functionaliites added to their sidebar menu based on role
