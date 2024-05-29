// controllers/MaintenanceRequestController.js
const MaintenanceRequest = require("../models").MaintenanceRequest;
const { House } = require("../models"); // Import your House model
const jwt = require("jsonwebtoken");

const createMaintenanceRequest = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming JWT is sent in the Authorization header
    const decodedToken = jwt.verify(token, "your_jwt_secret_key"); // Replace 'your_jwt_secret_key' with your actual JWT secret key
    const user_id = decodedToken.user_id;
    const { room, problem_faced } = req.body;

    const MaintenanceRequest = await MaintenanceRequest.create({
      room,
      problem_faced,
      status: "pending",
      user_id,
    });

    res.status(201).json({
      message: "Maintenance Request created successfully",
      MaintenanceRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMaintenanceRequests = async (req, res) => {
  try {
    const MaintenanceRequests = await MaintenanceRequest.findAll();

    res.status(200).json({ MaintenanceRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMaintenanceRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const MaintenanceRequest = await MaintenanceRequest.findByPk(id);

    if (!MaintenanceRequest) {
      return res.status(404).json({ error: "Maintenance Request not found" });
    }

    res.status(200).json({ MaintenanceRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMaintenanceRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedMaintenanceRequests] =
      await MaintenanceRequest.update(req.body, {
        where: { ad_id: id },
        returning: true,
      });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Maintenance Request not found" });
    }

    res.json(updatedMaintenanceRequests[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMaintenanceRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await MaintenanceRequest.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Maintenance Request not found" });
    }

    res.json({ message: "Maintenance Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMaintenanceRequest,
  getMaintenanceRequests,
  getMaintenanceRequestById,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
};
