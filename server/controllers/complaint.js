// controllers/docuementController.js
// get docuements by user
// get docuements by house ad
const Complaint = require("../models").Complaint;
const Application = require("../models").Application;
const Advertisement = require("../models").Advertisement;
const HouseAdvertisement = require("../models").HouseAdvertisement;
const evaluateTemporaryGrade = require("./application").evaluateTemporaryGrade;

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

    if (application_id) {
      // Set type to "result complaint"
      const complaintType = "result complaint";

      // Find the application
      const application = await Application.findOne({
        where: { application_id },
      });
      if (!application) {
        return res.status(404).json({ error: "Application not found." });
      }

      // Find the house advertisement associated with the application
      const houseAdvertisement = await HouseAdvertisement.findOne({
        where: { id: application.HouseAdvertisementId },
      });
      if (!houseAdvertisement) {
        return res
          .status(404)
          .json({ error: "House Advertisement not found." });
      }

      // Find the advertisement associated with the house advertisement
      const advertisement = await Advertisement.findOne({
        where: { ad_id: houseAdvertisement.ad_id },
      });
      if (!advertisement) {
        return res.status(404).json({ error: "Advertisement not found." });
      }

      // Check if the temporary result announcement date is within 7 days
      const tempResultAnnouncementDate = new Date(
        advertisement.tentative_result_announcement
      );
      const currentDate = new Date();
      const daysDifference = Math.floor(
        (currentDate - tempResultAnnouncementDate) / (1000 * 60 * 60 * 24)
      );

      if (daysDifference > 7) {
        return res
          .status(400)
          .json({ error: "Complaint submission period has passed." });
      }

      const complaint = await Complaint.create({
        title,
        type: complaintType,
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
    } else {
      // Handle complaints without application_id
      const complaint = await Complaint.create({
        title,
        type,
        description,
        status: "pending",
        category,
        complaintant_id: user_id,
        tenant_id,
      });

      res
        .status(201)
        .json({ message: "Complaint created successfully", complaint });
    }
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

    const complaint = await Complaint.findByPk(id, {
      include: Application,
      as: "application",
    });
    if (!complaint) {
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
const viewResultComplaints = async (req, res) => {
  try {
    const { adId } = req.params;
    const { status } = req.query; // Status filter (resolved, unresolved, all)

    let ad;

    if (adId) {
      // Fetch the specific advertisement by adId
      ad = await Advertisement.findOne({ where: { ad_id: adId } });

      if (!ad) {
        return res.status(404).json({ error: "Advertisement not found." });
      }
    } else {
      // Fetch the advertisement with status "temporary results announced"
      ad = await Advertisement.findOne({
        where: { status: "temporary results announced" },
      });

      if (!ad) {
        return res.status(404).json({
          error: "No advertisement with temporary results announced found.",
        });
      }
    }

    // Fetch all house advertisements associated with the advertisement
    const houseAdvertisements = await HouseAdvertisement.findAll({
      where: { ad_id: ad.ad_id },
      attributes: ["id"],
    });

    // Extract house advertisement IDs
    const houseAdIds = houseAdvertisements.map((houseAd) => houseAd.id);

    // Fetch all applications associated with the house advertisements
    const applications = await Application.findAll({
      where: { HouseAdvertisementId: houseAdIds },
      attributes: ["application_id"],
    });

    // Extract application IDs
    const applicationIds = applications.map(
      (application) => application.application_id
    );

    // Build where condition for complaints
    const complaintWhereCondition = {
      application_id: applicationIds,
      type: "result complaint",
    };

    // Add status filter if provided
    if (status && status !== "all") {
      complaintWhereCondition.status = status;
    }

    // Fetch complaints based on the where condition
    const complaints = await Complaint.findAll({
      where: complaintWhereCondition,
      include: {
        model: Application,
        as: "application",
      },
    });

    res.status(200).json({ complaints });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resolveComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findByPk(id, {
      include: {
        model: Application,
        as: "application",
      },
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const { action, applicationUpdates } = req.body;

    // 1. Change complaint status
    complaint.status = "resolved";

    // 2. Handle different actions based on complaint resolution
    if (action === "markAsCorrect") {
      // Just mark the complaint as resolved
      await complaint.save();
    } else if (action === "updateApplication") {
      // 3. Update application fields
      for (const [key, value] of Object.entries(applicationUpdates)) {
        complaint.application[key] = value;
      }
      await complaint.application.save();

      // 4. Re-evaluate the application result
      await evaluateTemporaryGrade(complaint.application); // Assuming evaluateApplicationResult is a function

      await complaint.save();
    } else if (action === "disqualifyApplication") {
      // 5. Change application status to disqualified
      complaint.application.status = "disqualified";
      await complaint.application.save();

      await complaint.save();
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Respond with the updated complaint and application
    return res.json({ complaint, application: complaint.application });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  viewResultComplaints,
  resolveComplaint,
};
