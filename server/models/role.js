"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: "UserRole", // The through option specifies the intermediate model (junction table)
        foreignKey: "role_id", // The foreign key in the junction table that references Role
        otherKey: "user_id",
        as: "users", // The foreign key in the junction table that references User
        onDelete: "CASCADE",
      });
    }
  }
  Role.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
    }
  );
  return Role;
};
