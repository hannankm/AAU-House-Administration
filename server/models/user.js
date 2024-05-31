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
      this.hasOne(models.Committee, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academic_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobile_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      office_phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      office_room_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};

// when user applies they should update on the profile their complete info

// admin must create all users with roles

// applicant, tenant
// comite
// vice, president, head, team leader, director
// position -- committee
// hr, staff,
// team leader, fac, vice, head - members of comite
// secondary committee + hr manager, secondary committee + staff affairs, secondary
// C2 HR, C2 Staff Affairs, Secondary Committee
//vice, pres, head, fac, applicant, tenant --
