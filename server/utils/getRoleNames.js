const { Role } = require("../models");
const { Op } = require("sequelize");

async function getRoleNamesFromIds(roleIds) {
  try {
    const roles = await Role.findAll({
      where: {
        role_id: {
          [Op.in]: roleIds, // Use the 'in' operator to find matching role IDs
        },
      },
    });

    // Return an array of role names from the retrieved roles
    return roles.map((role) => role.name);
  } catch (error) {
    console.log("error" + error.message);
  }
}

module.exports = getRoleNamesFromIds;
