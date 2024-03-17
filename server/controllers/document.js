// controllers/docuementController.js
// get docuements by user
// get docuements by house ad
const Document = require("../models").Document;
const jwt = require("jsonwebtoken");

const createDocument = async (req, res) => {
  try {
    const { title, file_path, verification_status, application_id } = req.body;

    const Document = await Document.create({
      title,
      file_path,
      verification_status,
      application_id,
    });

    res
      .status(201)
      .json({ message: "Document created successfully", Document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const Documents = await Document.findAll();

    res.status(200).json({ Documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const Document = await Document.findByPk(id);

    if (!Document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ Document });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedDocuments] = await Document.update(
      req.body,
      {
        where: { ad_id: id },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json(updatedDocuments[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Document.destroy({
      where: { ad_id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
