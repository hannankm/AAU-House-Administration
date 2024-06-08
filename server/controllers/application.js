// controllers/ApplicationController.js
// get applications by user
// get applications by house ad
const Application = require("../models").Application;
const HouseAdvertisement = require("../models").HouseAdvertisement;
const HouseReturn = require("../models").HouseReturn;
const Advertisement = require("../models").Advertisement;
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
      is_active_position,
      years_of_experience,
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
      is_active_position,
      years_of_experience,
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
  // if applicant must be owner only
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

const evaluateTemporaryGrade = async (application) => {
  console.log("evaluating");
  let temporary_grade = 0;

  // Gender
  if (application.gender == "F") {
    temporary_grade += 5;
  }

  // Disability
  if (application.disability != "None") {
    temporary_grade += 10;
  }

  // Family Size
  if (application.family_size > 5) {
    temporary_grade += 20;
  } else {
    temporary_grade += 4 * application.family_size;
  }

  // Position
  if (application.is_active_position) {
    if (
      [
        "dean",
        "director",
        "main registrar",
        "main librarian",
        "student's dean",
        "student services",
      ].includes(application.position)
    ) {
      temporary_grade += 20;
    } else if (
      application.position == "assistant dean" ||
      application.position == "course coordinator"
    ) {
      temporary_grade += 15;
    } else if (
      ["undergrad coordinator", "postgrad coordinator", "unit leader"].includes(
        application.position
      )
    ) {
      temporary_grade += 10;
    }
  } else {
    if (
      [
        "dean",
        "director",
        "main registrar",
        "main librarian",
        "student's dean",
        "student services",
      ].includes(application.position)
    ) {
      temporary_grade += 13;
    } else if (
      application.position == "assistant dean" ||
      application.position == "course coordinator"
    ) {
      temporary_grade += 7.5;
    } else if (
      ["undergrad coordinator", "postgrad coordinator", "unit leader"].includes(
        application.position
      )
    ) {
      temporary_grade += 5;
    }
  }

  // Spouse is Staff
  if (application.is_spouse_staff) {
    temporary_grade += 20;
  }

  // Academic Title
  switch (application.academic_title) {
    case "professor":
      temporary_grade += 30;
      break;
    case "associate professor":
      temporary_grade += 25;
      break;
    case "assistant professor":
      temporary_grade += 20;
      break;
    case "lecturer":
      temporary_grade += 15;
      break;
    case "assistant lecturer":
      temporary_grade += 12;
      break;
    case "graduate assistant":
      temporary_grade += 10;
      break;
  }

  // Years of Experience
  if (application.years_of_experience > 15) {
    temporary_grade += 20;
  } else if (application.years_of_experience > 10) {
    temporary_grade += 15;
  } else if (application.years_of_experience > 5) {
    temporary_grade += 10;
  }

  // const houseReturnsCount = await HouseReturn.count({
  //   where: { user_id: application.applicant_id },
  // });
  // if (houseReturnsCount > 0) {
  //   temporary_grade += 5; // Award 5 additional points if a home was returned
  // }
  console.log(temporary_grade);
  await application.update({
    temporary_grade: temporary_grade,
    status: "results generated",
  });

  return temporary_grade;
};

const generateTemporaryResults = async (req, res) => {
  try {
    // Extract advertisement ID from request parameters
    const { adId } = req.params;
    const ad = await Advertisement.findOne({ where: { ad_id: adId } });

    if (!ad) {
      return res.status(404).json({ message: "Advertisement not found." });
    }

    // Find all house advertisements associated with the provided advertisement ID
    const houseAdvertisements = await HouseAdvertisement.findAll({
      where: { ad_id: adId },
      include: [{ model: Application, as: "applications" }],
    });

    if (ad.status !== "documents verified") {
      let allApplicationsProcessed = true;

      // Iterate through each house advertisement
      for (const houseAd of houseAdvertisements) {
        // Check if there are any pending applications
        const hasPendingApplications = houseAd.applications.some(
          (application) => application.document_verified == "pending"
        );

        if (hasPendingApplications) {
          allApplicationsProcessed = false;
          break; // Exit the loop early if any pending applications are found
        }
      }

      if (!allApplicationsProcessed) {
        return res.status(400).json({
          message:
            "Temporary results cannot be generated because some applications are still pending.",
        });
      } else {
        await ad.update({ status: "documents verified" });
      }
    }

    // Iterate through each house advertisement
    for (const houseAd of houseAdvertisements) {
      // Iterate through each application in the house advertisement
      for (const application of houseAd.applications || []) {
        if (
          application.status == "documents verified" &&
          application.document_verified
        ) {
          // Evaluate temporary grade and update the application
          evaluateTemporaryGrade(application);
        }
      }
    }

    // Update ad status to results generated
    await ad.update({ status: "temporary results generated" });

    res
      .status(200)
      .json({ message: "Temporary results generated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// view ads listed by
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
  generateTemporaryResults,
};

// evaluate result
// generate result feild for a house ad -> all house-ads in an ad.

// update model
// yoe
// is position active
// returned house
// make profile entries required to apply
