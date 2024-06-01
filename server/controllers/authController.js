// controllers/authController.js

const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const User = require("../models").User;
const Role = require("../models").Role;
const UserRole = require("../models").UserRole;
const jwt = require("jsonwebtoken"); // Make sure jwt is imported

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      surname,
      mobile_phone_number,
      email,
      password,
    } = req.body;
    const userExists = await User.findAll({
      where: {
        email: email,
      },
    });
    if (userExists.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      first_name,
      last_name,
      surname,
      mobile_phone_number,
      email,
      password: bcryptPassword,
    });

    // Assign role to user
    // search for appplicant in role table then return role id and use it to create user role instaed of hard coding the role id
    const role_id = 1;
    await UserRole.create({
      user_id: user.user_id,
      role_id: role_id,
    });
    // jwt

    // user id, role id
    const token = jwtGenerator(user.user_id, role_id);

    res.json({
      status: 200,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "roles" }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found, password or email is incorrect!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ error: "Password or email is not correct." });
    }

    const roleIds = user.roles.map((role) => role.role_id);

    const token = jwtGenerator(user.user_id, roleIds);

    res.status(200).json({ token });
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

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    const user_id = decodedToken.user_id;
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    const user_id = decodedToken.user_id;
    const [updatedRowsCount, updatedUsers] = await User.update(req.body, {
      where: { user_id: user_id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUsers[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  register,
  login,
  logout,
  changePassword,
  getMyProfile,
  updateProfile,
};

// change password
// my profile
