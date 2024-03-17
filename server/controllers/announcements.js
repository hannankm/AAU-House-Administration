// controllers/AnnouncementController.js
const Announcement = require("../models").Announcement;
const { House } = require("../models"); // Import your House model
const jwt = require("jsonwebtoken");

const createAnnouncement = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming JWT is sent in the Authorization header
    const decodedToken = jwt.verify(token, "your_jwt_secret_key"); // Replace 'your_jwt_secret_key' with your actual JWT secret key
    const user_id = decodedToken.user_id;
    const { title, description, link } = req.body;

    const Announcement = await Announcement.create({
      title,
      description,
      link,
      user_id,
    });

    res
      .status(201)
      .json({ message: "Announcement created successfully", Announcement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const Announcements = await Announcement.findAll();

    res.status(200).json({ Announcements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;

    const Announcement = await Announcement.findByPk(id);

    if (!Announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.status(200).json({ Announcement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedAnnouncements] = await Announcement.update(
      req.body,
      {
        where: { ad_id: id },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.json(updatedAnnouncements[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Announcement.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};
