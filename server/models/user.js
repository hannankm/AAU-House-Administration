"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: "UserRole", // The through option specifies the intermediate model (junction table)
        foreignKey: "user_id", // The foreign key in the junction table that references Role
        otherKey: "role_id",
        as: "roles", // The foreign key in the junction table that references User
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
