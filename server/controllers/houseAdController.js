const Advertisement = require("../models").Advertisement;
const { House } = require("../models"); // Import your House model
const HouseAdvertisement = require("../models").HouseAdvertisement;

// Create a new house advertisement
const createHouseAdvertisement = async (req, res) => {
  try {
    const { ad_id, house_id } = req.body;

    // if ad id is not active/ pending
    // house id is not empty

    const houseAdvertisement = await HouseAdvertisement.create({
      ad_id,
      house_id,
    });

    res.status(201).json({
      message: "House Advertisement created successfully",
      houseAdvertisement,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get houses by advertisement ID
const getHousesByAdvertisementId = async (req, res) => {
  try {
    const { ad_id } = req.params;
    const houseAdvertisements = await HouseAdvertisement.findAll({
      where: { ad_id: ad_id },
      include: [{ model: House }, { model: Advertisement }],
    });

    // Extract houses from the result
    const houses = houseAdvertisements.map((ha) => ha.House);

    res.status(200).json({
      success: true,
      message: "Houses fetched successfully by advertisement ID",
      data: houseAdvertisements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching houses by advertisement ID",
      error: error.message,
    });
  }
};

// Get advertisements by house ID
const getAdvertisementsByHouseId = async (req, res) => {
  try {
    const { house_id } = req.params;

    const houseAdvertisements = await HouseAdvertisement.findAll({
      where: { house_id: house_id },
      include: [{ model: House }, { model: Advertisement }],
    });

    const advertisements = houseAdvertisements.map((ad) => ad.Adverstisement);

    if (!advertisements) {
      return res
        .status(404)
        .json({ error: "Advertisements not found for the given house ID" });
    }

    res.status(200).json({
      success: true,
      message: "Advertisements fetched successfully by house ID",
      data: advertisements,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// view results by house ad
const rankByTemporaryGrade = async (req, res) => {
  try {
    const { houseAd_id } = req.params;
    // Find all house advertisements associated with the provided advertisement ID
    const houseAdvertisement = await HouseAdvertisement.findAll({
      where: { id: houseAd_id },
      include: [{ model: Application }],
    });

    // Iterate through each house advertisement
    const sortedApplications = [];

    // Sort only if temporary grade is available and application status is "document_verified"
    if (
      houseAdvertisement.Applications.every(
        (app) =>
          app.temporary_grade &&
          app.status === "document_verified" &&
          app.document_verified === "verified"
      )
    ) {
      // Sort applications by temporary grade descending, then apply tie-breaking rules
      sortedApplications = houseAdvertisement.Applications.sort((a, b) => {
        if (b.temporary_grade !== a.temporary_grade) {
          return b.temporary_grade - a.temporary_grade;
        }
        if (b.disability && !a.disability) {
          return 1;
        }
        if (!b.disability && a.disability) {
          return -1;
        }
        if (b.gender === "Female" && a.gender !== "Female") {
          return 1;
        }
        if (a.gender === "Female" && b.gender !== "Female") {
          return -1;
        }
        // Random tie-breaker
        return Math.random() - 0.5;
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHouseAdvertisement,
  getHousesByAdvertisementId,
  getAdvertisementsByHouseId,
};

// delete house id
// validate on create house ad
// send house count of each ads
