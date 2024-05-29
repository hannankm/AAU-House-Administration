// controllers/ApplicationController.js
// get applications by user
// get applications by house ad
const Application = require("../models").Application;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const createApplication = async (req, res) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    const applicant_id = decodedToken.user_id;
    const { houseAd_id } = req.params;

    const {
      spouse_full_name,
      is_spouse_staff,
      spouse_id,
      family_size,
      position,
      college_department,
      academic_title,
      type,
      signature,
      disablity,
      additional_position,
    } = req.body;

    // "spouse_full_name": "Selam Tesfaye",
    // "is_spouse_staff": 0,
    //     "family_size": 3,
    // "position" : "Assistant Proffesor ",
    // "college_department": "School of Information Systems",
    // "academic_title": "Dr.",
    // "type": "new",
    // "signature": "tibebe",
    // "disablity": "None",
    // "additional_position": "Course Coordinator"

    const application = await Application.create({
      spouse_full_name,
      is_spouse_staff,
      spouse_id,
      family_size,
      status: "pending",
      position,
      academic_title,
      type,
      college_department,
      signature,
      disablity,
      additional_position,
      document_verified: "pending",
      HouseAdvertisementId: houseAd_id,
      applicant_id,
    });

    res
      .status(201)
      .json({ message: "Application created successfully", application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByPk(id);

    if (!Application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ application });
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
        where: { application_id: id },
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
      where: { application_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const evaluate_tentative_grade = async (req, res) => {
  try {
  } catch (err) {
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

// evaluate result
// generate result feild for a house ad -> all house-ads in an ad.
