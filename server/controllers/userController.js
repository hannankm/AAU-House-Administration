// controllers/UserController.js
const User = require("../models").User;
const { House } = require("../models"); // Import your House model
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming JWT is sent in the Authorization header
    const decodedToken = jwt.verify(token, "your_jwt_secret_key"); // Replace 'your_jwt_secret_key' with your actual JWT secret key
    const user_id = decodedToken.user_id;
    // find active lease id for this user id
    const lease_id = user_id;
    const { status } = req.body;

    const User = await User.create({
      status,
      type,
      lease_id,
    });

    res.status(201).json({ message: "User created successfully", User });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const Users = await User.findAll();

    res.status(200).json({ Users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const User = await User.findByPk(id);

    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ User });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedUsers] = await User.update(req.body, {
      where: { ad_id: id },
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
      where: { ad_id: id },
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

// crud user
// create user with user role primary commitee, secondary commitee & validate the user's role.
