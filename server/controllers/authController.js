// controllers/authController.js

const bcrypt = require("bcrypt");
const User = require("../models").User;
const Role = require("../models").Role;
const UserRole = require("../models").UserRole;

const register = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, password } = req.body;
    const user = await User.create({
      first_name,
      last_name,
      phone_number,
      email,
      password,
    });

    await UserRole.create({
      user_id: user.user_id,
      role_id: 1,
    });
    // Assign role to user

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValidPassword = password == user.password;

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const userRoles = await UserRole.findAll({
      where: { user_id: user.user_id },
    });

    // Extract role IDs from userRoles
    const roleIds = userRoles.map((userRole) => userRole.role_id);

    // Retrieve role names based on role IDs
    const roles = await Role.findAll({
      where: { role_id: roleIds },
    });

    // Extract role names from roles
    const roleNames = roles.map((role) => role.name);

    // Set user in the session
    req.session.user = user;

    // Redirect based on user role

    if (roleNames.includes("applicant")) {
      res.json({ role: "Applicant", user });
    } else if (roleNames.includes("head")) {
      res.json({ role: "Head", user });
    } else if (roleNames.includes("president")) {
      res.json({ role: "President", user });
    } else if (roleNames.includes("director")) {
      res.json({ role: "Director", user });
    } else {
      res.json({ message: "Login successful", user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.redirect("/");
  });
};

module.exports = {
  register,
  login,
  logout,
};
