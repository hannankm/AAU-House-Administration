const { User } = require("../models");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      surname,
      email,
      password,
      academic_title,
      mobile_phone_number,
      office_phone_number,
      office_room_number,
      gender,
    } = req.body;

    const newUser = await User.create({
      first_name,
      last_name,
      surname,
      email,
      password,
      academic_title,
      mobile_phone_number,
      office_phone_number,
      office_room_number,
      gender,
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedUsers] = await User.update(req.body, {
      where: { user_id: id },
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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await User.destroy({
      where: { user_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
