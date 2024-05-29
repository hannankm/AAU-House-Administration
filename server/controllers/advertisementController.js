const Advertisement = require("../models").Advertisement;
const { House } = require("../models");

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
};

// no two active ads at a time

// get rejected ads for head then update it
// status - application closed
