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

const viewMyResult = async (req, res) => {
  try {
    // Assuming the user ID is available in req.user.id
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    const applicant_id = decodedToken.user_id;
    // Fetch the application associated with the user
    const application = await Application.findOne({
      where: { applicant_id: applicant_id },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (application.status !== "temporary results announced") {
      return res
        .status(400)
        .json({ message: "Temporary results not announced yet." });
    }

    // Calculate temporary grade and prepare notes
    let notes = [];

    // Gender
    if (application.gender === "Female") {
      notes.push("Gender (Female): +5");
    }

    // Disability
    if (application.disability !== "None") {
      notes.push("Disability: +10. ");
    }

    // Family Size
    if (application.family_size > 5) {
      notes.push("Family Size (>5): +20. ");
    } else {
      const familySizePoints = 4 * application.family_size;
      notes.push(`Family Size (<=5): +${familySizePoints}. `);
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
        notes.push(
          "Active Position (Dean/Director/Main Registrar/etc.): +20. "
        );
      } else if (
        application.position === "assistant dean" ||
        application.position === "course coordinator"
      ) {
        notes.push(
          "Active Position (Assistant Dean/Course Coordinator): +15. "
        );
      } else if (
        [
          "undergrad coordinator",
          "postgrad coordinator",
          "unit leader",
        ].includes(application.position)
      ) {
        notes.push(
          "Active Position (Undergrad/Postgrad Coordinator/Unit Leader): +10. "
        );
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
        notes.push(
          "Inactive Position (Dean/Director/Main Registrar/etc.): +13. "
        );
      } else if (
        application.position === "assistant dean" ||
        application.position === "course coordinator"
      ) {
        notes.push(
          "Inactive Position (Assistant Dean/Course Coordinator): +7.5. "
        );
      } else if (
        [
          "undergrad coordinator",
          "postgrad coordinator",
          "unit leader",
        ].includes(application.position)
      ) {
        notes.push(
          "Inactive Position (Undergrad/Postgrad Coordinator/Unit Leader): +5. "
        );
      }
    }

    // Spouse is Staff
    if (application.is_spouse_staff) {
      notes.push("Spouse is Staff: +20. ");
    }

    // Academic Title
    switch (application.academic_title) {
      case "professor":
        notes.push("Academic Title (Professor): +30. ");
        break;
      case "associate professor":
        notes.push("Academic Title (Associate Professor): +25. ");
        break;
      case "assistant professor":
        notes.push("Academic Title (Assistant Professor): +20. ");
        break;
      case "lecturer":
        notes.push("Academic Title (Lecturer): +15. ");
        break;
      case "assistant lecturer":
        notes.push("Academic Title (Assistant Lecturer): +12. ");
        break;
      case "graduate assistant":
        notes.push("Academic Title (Graduate Assistant): +10. ");
        break;
    }

    // Years of Experience
    if (application.years_of_experience > 15) {
      notes.push("Years of Experience (>15): +20. ");
    } else if (application.years_of_experience > 10) {
      notes.push("Years of Experience (>10): +15. ");
    } else if (application.years_of_experience > 5) {
      notes.push("Years of Experience (>5): +10. ");
    }
    notes.push(`Grade: ${application.temporary_grade}. `);

    // Respond with the application details
    return res.json({ application: application, notes: notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const generateFinalResults = async (req, res) => {
  try {
    const { adId } = req.params;
    const ad = await Advertisement.findOne({ where: { ad_id: adId } });

    if (!ad) {
      return res.status(404).json({ error: "Advertisement not found." });
    }

    // Check if the ad status is "temporary results announced"
    if (ad.status !== "temporary results announced") {
      return res
        .status(400)
        .json({ error: "Temporary results not announced yet." });
    }

    // Find all applications associated with the provided advertisement ID
    const applications = await Application.findAll({
      where: { ad_id: adId },
      include: [{ model: Complaint, as: "complaints" }],
    });

    let unresolvedComplaintsExist = false;

    // Check for unresolved complaints and update final grades
    for (const application of applications) {
      const unresolvedComplaints = application.complaints.filter(
        (complaint) => complaint.status !== "resolved"
      );

      if (unresolvedComplaints.length > 0) {
        unresolvedComplaintsExist = true;
        break;
      }

      if (
        application.temporary_grade &&
        application.status !== "disqualified"
      ) {
        application.final_grade = application.temporary_grade;
        application.status = "final result generated";
        await application.save();
      }
    }

    if (unresolvedComplaintsExist) {
      return res.status(400).json({
        error: "There are unresolved complaints for some applications.",
      });
    }

    // Update the advertisement status to "final result generated"
    ad.status = "final result generated";
    await ad.save();

    res.status(200).json({ message: "Final results generated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  view_my_applications,
  generateTemporaryResults,
  evaluateTemporaryGrade,
  generateFinalResults,
  viewMyResult,
};

// evaluate result
// generate result feild for a house ad -> all house-ads in an ad.

// update model
// yoe
// is position active
// returned house
// make profile entries required to apply
