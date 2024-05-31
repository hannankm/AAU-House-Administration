"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id", // The foreign key in the junction table that references User
        onDelete: "CASCADE",
      });

      // Define a "belongsTo" association with the Role model
      this.belongsTo(models.Role, {
        foreignKey: "role_id", // The foreign key in the junction table that references Role
        onDelete: "CASCADE",
      });
    }
  }
  UserRole.init(
    {
      role_id: DataTypes.INTEGER,
      user_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "userroles",
    }
  );
  return UserRole;
};
