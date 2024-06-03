// controllers/docuementController.js
// get docuements by user
// get docuements by house ad
const Complaint = require("../models").Complaint;
const jwt = require("jsonwebtoken");

const createComplaint = async (req, res) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    const user_id = decodedToken.user_id;
    const { title, type, description, category, application_id, tenant_id } =
      req.body;

    const complaint = await Complaint.create({
      title,
      type,
      description,
      status: "pending",
      category,
      complaintant_id: user_id,
      application_id,
      tenant_id,
    });

    res
      .status(201)
      .json({ message: "Complaint created successfully", complaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll();

    res.status(200).json({ complaints });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findByPk(id);

    if (!Complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json({ complaint });
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
        where: { id: id },
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
      where: { id: id },
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
