// controllers/ApplicationController.js
// get applications by user
// get applications by house ad
const Application = require("../models").Application;
const jwt = require("jsonwebtoken");

const createApplication = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming JWT is sent in the Authorization header
    const decodedToken = jwtrew.verify(token, "your_jwt_secret_key"); // Replace 'your_jwt_secret_key' with your actual JWT secret key
    const user_id = decodedToken.user_id;
    const { title, description, link } = req.body;

    const Application = await Application.create({
      title,
      description,
      link,
      user_id,
    });

    res
      .status(201)
      .json({ message: "Application created successfully", Application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const Applications = await Application.findAll();

    res.status(200).json({ Applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const Application = await Application.findByPk(id);

    if (!Application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ Application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedApplications] = await Application.update(
      req.body,
      {
        where: { ad_id: id },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json(updatedApplications[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Application.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
