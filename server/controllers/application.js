// controllers/ApplicationController.js
// get applications by user
// get applications by house ad
const Application = require("../models").Application;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { where } = require("sequelize");

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

const evaluateTemporaryGrade = (application) => {
  let temporary_grade = 0;

  // application.gender == F +5
  // if disability == yes +10
  // if application.yoe >15 20,
  // application. position
  // acadmic title
  // family size ==
  // if spouse is staff

  // application.
  // Your logic for evaluating temporary grade
  // This could involve calculations based on application data
  // Return the evaluated temporary grade
  // update applciation grade
  // 
};

// rank then announce
const rank_applicants = (house_ad) => {
  // based on temporary grade sort descending order if equal points
  // disable person first
  // then female first
  // then at random
};

const view_my_applications = async (req, res) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    const applicant_id = decodedToken.user_id;
    const my_applications = await Application.findAll({
      where: { applicant_id: applicant_id },
    });
    res.status(200).json({ my_applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitApplication = async (req, res) => {
  // ?create document entires for all
  // change status to "submitted"
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  view_my_applications,
  evaluateTemporaryGrade,
};

// evaluate result
// generate result feild for a house ad -> all house-ads in an ad.
