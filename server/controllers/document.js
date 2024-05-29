// controllers/docuementController.js
// get docuements by user
// get docuements by house ad
const Document = require("../models").Document;
const Application = require("../models").Application;

const jwt = require("jsonwebtoken");

const createDocument = async (req, res) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);

    const { application_id } = req.params;
    const application = await Application.findByPk(application_id);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const singleFile = req.files.singleFile?.[0]; // Retrieve the first file for 'singleFile' key
    const multiFiles = req.files.multiFiles; // Retrieve all files for 'multiFiles' key

    const uploadedFiles = [];

    if (singleFile) {
      uploadedFiles.push({ key: "singleFile", path: singleFile.path });
    }

    if (multiFiles) {
      multiFiles.forEach((file) => {
        uploadedFiles.push({ key: "multiFiles", path: file.path });
      });
    }

    res.status(200).json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });

    const documents = [];

    for (const file of req.files) {
      const document = await Document.create({
        title: req.body.name,
        // type: req.body.type,
        file_path: file.path,
        application: application_id,
      });
      documents.push(document); // Keep track of the created documents
    }

    res
      .status(201)
      .json({ message: "Document created successfully", documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();

    res.status(200).json({ Documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ document });
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

// what are all the files necesary
// Birth certificate
// marital certificate
// hr letter
//
