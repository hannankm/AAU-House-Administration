// controllers/LeaseAgreementController.js
const LeaseAgreement = require("../models").LeaseAgreement;
const { House } = require("../models"); // Import your House model
const jwt = require("jsonwebtoken");

const createLeaseAgreement = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming JWT is sent in the Authorization header
    const decodedToken = jwt.verify(token, "your_jwt_secret_key"); // Replace 'your_jwt_secret_key' with your actual JWT secret key
    const user_id = decodedToken.user_id;
    const { title, description, link } = req.body;

    const LeaseAgreement = await LeaseAgreement.create({
      title,
      description,
      link,
      user_id,
    });

    res
      .status(201)
      .json({ message: "LeaseAgreement created successfully", LeaseAgreement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLeaseAgreements = async (req, res) => {
  try {
    const LeaseAgreements = await LeaseAgreement.findAll();

    res.status(200).json({ LeaseAgreements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLeaseAgreementById = async (req, res) => {
  try {
    const { id } = req.params;

    const LeaseAgreement = await LeaseAgreement.findByPk(id);

    if (!LeaseAgreement) {
      return res.status(404).json({ error: "LeaseAgreement not found" });
    }

    res.status(200).json({ LeaseAgreement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLeaseAgreement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedLeaseAgreements] =
      await LeaseAgreement.update(req.body, {
        where: { ad_id: id },
        returning: true,
      });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "LeaseAgreement not found" });
    }

    res.json(updatedLeaseAgreements[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLeaseAgreement = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await LeaseAgreement.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "LeaseAgreement not found" });
    }

    res.json({ message: "LeaseAgreement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLeaseAgreement,
  getLeaseAgreements,
  getLeaseAgreementById,
  updateLeaseAgreement,
  deleteLeaseAgreement,
};
