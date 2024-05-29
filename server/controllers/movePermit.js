// controllers/MovePermitController.js
const MovePermit = require("../models").MovePermit;
const { House } = require("../models"); // Import your House model
const jwt = require("jsonwebtoken");

const createMovePermit = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming JWT is sent in the Authorization header
    const decodedToken = jwt.verify(token, "your_jwt_secret_key"); // Replace 'your_jwt_secret_key' with your actual JWT secret key
    const user_id = decodedToken.user_id;
    const { type } = req.body;

    const MovePermit = await MovePermit.create({
      status: "pending",
      type,
      user_id,
    });

    res
      .status(201)
      .json({ message: "MovePermit created successfully", MovePermit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovePermits = async (req, res) => {
  try {
    const MovePermits = await MovePermit.findAll();

    res.status(200).json({ MovePermits });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovePermitById = async (req, res) => {
  try {
    const { id } = req.params;

    const MovePermit = await MovePermit.findByPk(id);

    if (!MovePermit) {
      return res.status(404).json({ error: "MovePermit not found" });
    }

    res.status(200).json({ MovePermit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovePermit = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedMovePermits] = await MovePermit.update(
      req.body,
      {
        where: { ad_id: id },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "MovePermit not found" });
    }

    res.json(updatedMovePermits[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovePermit = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await MovePermit.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "MovePermit not found" });
    }

    res.json({ message: "MovePermit deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMovePermit,
  getMovePermits,
  getMovePermitById,
  updateMovePermit,
  deleteMovePermit,
};
