// controllers/HouseReturnController.js
const HouseReturn = require("../models").HouseReturn;
const { House } = require("../models"); // Import your House model
const jwt = require("jsonwebtoken");

const createHouseReturn = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming JWT is sent in the Authorization header
    const decodedToken = jwt.verify(token, "your_jwt_secret_key"); // Replace 'your_jwt_secret_key' with your actual JWT secret key
    const tenant_id = decodedToken.user_id;
    const { reason, date_range_for_inspection } = req.body;

    const houseReturn = await HouseReturn.create({
      status: "pending",
      reason,
      date_range_for_inspection,
      tenant_id,
    });

    res
      .status(201)
      .json({ message: "HouseReturn created successfully", houseReturn });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHouseReturns = async (req, res) => {
  try {
    const houseReturns = await HouseReturn.findAll();

    res.status(200).json({ HouseReturns });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHouseReturnById = async (req, res) => {
  try {
    const { id } = req.params;

    const houseReturn = await HouseReturn.findByPk(id);

    if (!houseReturn) {
      return res.status(404).json({ error: "HouseReturn not found" });
    }

    res.status(200).json({ houseReturn });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHouseReturn = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedHouseReturns] = await HouseReturn.update(
      req.body,
      {
        where: { ad_id: id },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "HouseReturn not found" });
    }

    res.json(updatedHouseReturns[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHouseReturn = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await HouseReturn.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "HouseReturn not found" });
    }

    res.json({ message: "HouseReturn deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHouseReturn,
  getHouseReturns,
  getHouseReturnById,
  updateHouseReturn,
  deleteHouseReturn,
};

// user requests
// view requests by status
// update requests set the date range for inspection &
