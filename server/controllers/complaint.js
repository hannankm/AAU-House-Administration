// controllers/docuementController.js
// get docuements by user
// get docuements by house ad
const Complaint = require("../models").Complaint;
const jwt = require("jsonwebtoken");

const createComplaint = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming JWT is sent in the Authorization header
    const decodedToken = jwtrew.verify(token, "your_jwt_secret_key"); // Replace 'your_jwt_secret_key' with your actual JWT secret key
    const user_id = decodedToken.user_id;
    const { title, type, description, status, category, application_id } =
      req.body;

    const Complaint = await Complaint.create({
      title,
      type,
      description,
      status,
      category,
      user_id,
      application_id,
    });

    res
      .status(201)
      .json({ message: "Complaint created successfully", Complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComplaints = async (req, res) => {
  try {
    const Complaints = await Complaint.findAll();

    res.status(200).json({ Complaints });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    const Complaint = await Complaint.findByPk(id);

    if (!Complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({ Complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedComplaints] = await Complaint.update(
      req.body,
      {
        where: { ad_id: id },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(updatedComplaints[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Complaint.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
};
