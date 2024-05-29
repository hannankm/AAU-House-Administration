// controllers/AnnouncementController.js
const Announcement = require("../models").Announcement;
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const createAnnouncement = async (req, res) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    const user_id = decodedToken.user_id;
    const { title, description, link } = req.body;

    const announcement = await Announcement.create({
      title,
      description,
      link,
      UserId: user_id,
    });

    res
      .status(201)
      .json({ message: "Announcement created successfully", announcement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();

    res.status(200).json({ announcements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByPk(id);

    if (!Announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.status(200).json({ announcement });
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
        where: { id: id },
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
      where: { id: id },
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
