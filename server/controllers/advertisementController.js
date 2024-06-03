const Advertisement = require("../models").Advertisement;
const { House } = require("../models");
const HouseAdvertisement = require("../models").HouseAdvertisement;
const Application = require("../models").Application;

const { Op, Sequelize } = require("sequelize");
const { createAnnouncement } = require("./announcements");

const createAdvertisement = async (req, res) => {
  try {
    const { post_date, application_start_date, application_deadline, notes } =
      req.body;

    const advertisement = await Advertisement.create({
      post_date: Date.now(),
      application_start_date,
      application_deadline,
      status: "Pending",
      notes,
    });

    res
      .status(201)
      .json({ message: "Advertisement created successfully", advertisement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.findAll({
      include: [
        {
          model: House,
          as: "houses",
        },
      ],
    });

    res.status(200).json({ advertisements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdvertisementById = async (req, res) => {
  try {
    const { id } = req.params;

    const advertisement = await Advertisement.findByPk(id, {
      include: [
        {
          model: House,
          as: "houses",
        },
      ],
    });

    if (!advertisement) {
      return res.status(404).json({ error: "Advertisement not found" });
    }

    res.status(200).json({ advertisement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAdvertisement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedAdvertisements] =
      await Advertisement.update(req.body, {
        where: { ad_id: id },
        returning: true,
      });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Advertisement not found" });
    }

    res.json(updatedAdvertisements[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAdvertisement = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Advertisement.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Advertisement not found" });
    }

    res.json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewAdsforAuthorizationByDirector = async (req, res) => {
  try {
    // Fetch all advertisements with the status approved by director
    const ads = await Advertisement.findAll({
      where: { status: "Pending" },
      include: [
        {
          model: House,
          as: "houses",
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Advertisements for director authorization fetched successfully",
      data: ads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching advertisements for director authorization.",
      error: error.message,
    });
  }
};

const viewAdsforAuthorizationByPresident = async (req, res) => {
  try {
    // Fetch all advertisements with the status approved by president
    const ads = await Advertisement.findAll({
      where: { status: "approved_by_director" },
      include: [
        {
          model: House,
          as: "houses",
        },
      ],
    });

    res.status(200).json({
      success: true,
      message:
        "Advertisements for preseident authorization fetched successfully",
      data: ads,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching advertisements for president authorization.",
      error: error.message,
    });
  }
};

const getAdvertisementsByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const advertisements = await Advertisement.findAll({
      where: { status },
      include: [
        {
          model: House,
          as: "houses",
        },
      ],
    });
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActiveAdvertisment = async (req, res) => {
  try {
    const advertisements = await Advertisement.findOne({
      where: { status: "active" },
      include: [
        {
          model: House,
          as: "houses",
        },
      ],
    });
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const authorizeByPresident = async (req, res) => {
  const adId = req.params.id;

  try {
    // Check if the advertisement exists
    const advertisement = await Advertisement.findByPk(adId);
    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found",
      });
    }

    // Check if the status is approved by director
    if (advertisement.status !== "approved_by_director") {
      return res.status(400).json({
        success: false,
        message:
          "Advertisement cannot be approved by president. Status is not approved by director.",
      });
    }

    // Update the status to approved by president
    await advertisement.update({
      status: "approved_by_president",
    });

    res.status(200).json({
      success: true,
      message: "Advertisement approved by president successfully",
      data: advertisement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error approving advertisement by president",
      error: error.message,
    });
  }
};

const authorizeByDirector = async (req, res) => {
  const adId = req.params.id;

  try {
    // Check if the advertisement exists
    const advertisement = await Advertisement.findByPk(adId);
    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found",
      });
    }

    // Check if the status is pending
    if (advertisement.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          "Advertisement cannot be approved by director. Status is not pending.",
      });
    }

    // Update the status to approved by director
    await advertisement.update({
      status: "approved_by_director",
    });

    res.status(200).json({
      success: true,
      message: "Advertisement approved by director successfully",
      data: advertisement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error approving advertisement by director",
      error: error.message,
    });
  }
};

const rejectByDirector = async (req, res) => {
  const adId = req.params.id;

  try {
    // Check if the advertisement exists
    const advertisement = await Advertisement.findByPk(adId);
    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found",
      });
    }

    // Check if the status is pending
    if (advertisement.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          "Advertisement cannot be rejected by director. Status is not pending.",
      });
    }

    // Update the status to rejected by director
    await advertisement.update({
      status: "rejected_by_director",
    });

    res.status(200).json({
      success: true,
      message: "Advertisement rejected by director successfully",
      data: advertisement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error rejecting advertisement by director",
      error: error.message,
    });
  }
};

const rejectByPresident = async (req, res) => {
  const adId = req.params.id;

  try {
    // Check if the advertisement exists
    const advertisement = await Advertisement.findByPk(adId);
    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found",
      });
    }

    // Check if the status is approved by director
    if (advertisement.status !== "approved_by_director") {
      return res.status(400).json({
        success: false,
        message:
          "Advertisement cannot be rejected by president. Status is not approved by director.",
      });
    }

    // Update the status to rejected by president
    await advertisement.update({
      status: "rejected_by_president",
    });

    res.status(200).json({
      success: true,
      message: "Advertisement rejected by president  successfully",
      data: advertisement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error rejecting advertisement by president",
      error: error.message,
    });
  }
};

const postAdvertisement = async (req, res) => {
  const adId = req.params.id;
  try {
    // Check if the advertisement exists
    const advertisement = await Advertisement.findByPk(adId);
    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: "Advertisement not found",
      });
    }

    const activeAds = await Advertisement.findOne({
      where: {
        status: "active",
      },
    });

    // Check if the status is approved by president
    if (activeAds) {
      return res.status(400).json({
        success: false,
        message:
          "Advertisement cannot be posted. There is an active ad at the moment, there cannot be two active advertisements at a time.",
      });
    }

    // check if there is an active ad first
    if (advertisement.status !== "approved_by_president") {
      return res.status(400).json({
        success: false,
        message:
          "Advertisement cannot be posted. Status is not approved by president.",
      });
    }
    // Update the status to approved by director and set the post date
    await advertisement.update({
      status: "active",
      post_date: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Advertisement posted successfully",
      data: advertisement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error posting advertisement.",
      error: error.message,
    });
  }
};

// the page for evaluate, announce and preview
const getTemporaryAdOverview = async (req, res) => {
  try {
    // Fetch the active ad
    const { adId } = req.params;

    const ad = await Advertisement.findOne({
      where: {
        ad_id: adId,
      },
    });

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad Not Found.",
      });
    }

    const houseAds = await HouseAdvertisement.findAll({
      where: { ad_id: ad.ad_id },
      include: [
        {
          model: Application,
          as: "applications",
          attributes: [
            "HouseAdvertisementId",
            [
              Sequelize.fn(
                "COUNT",
                Sequelize.col("applications.application_id")
              ),
              "total",
            ],
            [
              Sequelize.fn(
                "SUM",
                Sequelize.literal(
                  'CASE WHEN "applications"."status" = \'pending\' THEN 1 ELSE 0 END'
                )
              ),
              "pending",
            ],
            [
              Sequelize.fn(
                "SUM",
                Sequelize.literal(
                  'CASE WHEN "applications"."status" = \'documents verified\' THEN 1 ELSE 0 END'
                )
              ),
              "verified",
            ],
            [
              Sequelize.fn(
                "SUM",
                Sequelize.literal(
                  'CASE WHEN "applications"."status" = \'disqualified\' THEN 1 ELSE 0 END'
                )
              ),
              "disqualified",
            ],
          ],
          // Grouping by the id of HouseAdvertisement
        },
      ],
      group: ["HouseAdvertisement.id", "applications.application_id"],
    });

    // Initialize response object
    const response = {
      ad: ad,
      houseAds: [],
      allVerified: true,
    };

    // Process each house ad
    for (let houseAd of houseAds) {
      // Extract aggregated application data
      const applicationData = houseAd.applications || {
        total: 0,
        pending: 0,
        verified: 0,
        disqualified: 0,
      };

      // Determine if there are pending applications
      const hasPending = applicationData.pending > 0;

      // Update allVerified flag if there are pending applications
      if (hasPending) {
        response.allVerified = false;
      }

      // Add house ad info to response
      response.houseAds.push({
        houseAd,
        statusCounts: {
          pending: applicationData.pending,
          verified: applicationData.verified,
          disqualified: applicationData.disqualified,
          total: applicationData.total,
        },
        allVerified: !hasPending,
      });
    }

    // Send response
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting ad.",
      error: error.message,
      details: error,
    });
  }
};

// preview result
const rankByTemporaryGrade = async (req, res) => {
  try {
    const { adId } = req.params;
    // Find all house advertisements associated with the provided advertisement ID
    const houseAdvertisements = await HouseAdvertisement.findAll({
      where: { ad_id: adId },
      include: [{ model: Application }],
    });

    // Prepare a response object grouped by house advertisement ID
    const response = {};

    // Iterate through each house advertisement
    for (const houseAd of houseAdvertisements) {
      const sortedApplications = [];

      // Sort only if temporary grade is available and application status is "document_verified"
      if (
        houseAd.Applications.every(
          (app) =>
            app.temporary_grade &&
            app.status === "document_verified" &&
            app.document_verified === "verified"
        )
      ) {
        // Sort applications by temporary grade descending, then apply tie-breaking rules
        sortedApplications = houseAd.Applications.sort((a, b) => {
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

      response[houseAd.ad_id] = sortedApplications;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get ranked applications by house ad
// who posts this announcement? head or vice
const announceTemporaryAdResults = async (req, res) => {
  try {
    const { adId } = req.params;

    // Find the advertisement by ID
    const ad = await Advertisement.findOne({ where: { id: adId } });

    if (!ad) {
      return res.status(404).json({ error: "Advertisement not found." });
    }

    // Create the announcement based on the ad details
    // Create the announcement request object
    const announcementReq = {
      header: req.header.bind(req), // to pass the authorization header
      body: {
        title: `Results for ${ad.title}`,
        description: `The temporary results for the housing advertisements posted on "${ad.post_date}" have been announced. Please check the results at the provided link.`,
        link: "/temporary-results/" + ad.ad_id,
      },
    };

    // Use a custom response object to capture the createAnnouncement response
    const announcementRes = {
      status: (statusCode) => ({
        json: (response) => {
          announcementRes.statusCode = statusCode;
          announcementRes.response = response;
        },
      }),
      statusCode: null,
      response: null,
    };

    // Call the createAnnouncement method
    await createAnnouncement(announcementReq, announcementRes);

    // Check if the announcement was created successfully
    if (announcementRes.statusCode !== 201) {
      return res
        .status(announcementRes.statusCode)
        .json(announcementRes.response);
    }

    // Update the ad status to "temporary results announced"
    await ad.update({ status: "temporary results announced" });

    res.status(201).json({
      message: "Announcement created and ad status updated successfully.",
      announcement: announcementRes.response.announcement,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get ad based on temporary grade (vice )
// get ad, house ads, application by status count, all_applications_are not_pending flag (to disable the evaluate/ view/ announce result button)

// get ranked applications by house ad
const viewTemporaryAdResults = async (req, res) => {
  try {
    const { adId } = req.params;
    const ad = await Advertisement.findOne({ where: { id: adId } });

    if (!ad) {
      return res.status(404).json({ error: "Advertisement not found." });
    }

    // Check if the ad status is "temporary results announced"
    if (ad.status !== "temporary results announced") {
      return res
        .status(400)
        .json({ error: "Temporary results not announced yet." });
    }
    // Find all house advertisements associated with the provided advertisement ID
    const houseAdvertisements = await HouseAdvertisement.findAll({
      where: { ad_id: adId },
      include: [{ model: Application }],
    });

    // Prepare a response object grouped by house advertisement ID
    const response = {};

    // Iterate through each house advertisement
    for (const houseAd of houseAdvertisements) {
      const sortedApplications = [];

      // Sort only if temporary grade is available and application status is "document_verified"
      if (
        houseAd.Applications.every(
          (app) =>
            app.temporary_grade &&
            app.status === "document_verified" &&
            app.document_verified === "verified"
        )
      ) {
        // Sort applications by temporary grade descending, then apply tie-breaking rules
        sortedApplications = houseAd.Applications.sort((a, b) => {
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

      response[houseAd.ad_id] = sortedApplications;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAdvertisement,
  getAdvertisements,
  getAdvertisementById,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisementsByStatus,
  viewAdsforAuthorizationByDirector,
  viewAdsforAuthorizationByPresident,
  getActiveAdvertisment,
  authorizeByDirector,
  authorizeByPresident,
  postAdvertisement,
  rejectByDirector,
  rejectByPresident,
  announceTemporaryAdResults,
  rankByTemporaryGrade,
  viewTemporaryAdResults,
  getTemporaryAdOverview,
};

// no two active ads at a time

// get rejected ads for head then update it
// status - application closed

// send complaints
// get complaints and make changes
// rank by final result
// announce final result
// sign lease
// be tenant and tenant features
