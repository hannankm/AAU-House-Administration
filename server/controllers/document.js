const Document = require("../models").Document;
const Application = require("../models").Application;
const upload = require("../utils/multer");

const createDocument = async (req, res) => {
  const { application_id } = req.params;
  try {
    // if application is the requester's go on

    // Access uploaded files from req.files
    const { childrenBirthCertificates, maritalDocument, hrLetter, disability } =
      req.files;

    // Save children's birth certificates
    // based on family size entry
    if (childrenBirthCertificates) {
      await Promise.all(
        childrenBirthCertificates.map(async (file) => {
          await Document.create({
            application_id: application_id,
            title: "Child Birth Certificate",
            file_path: file.filename,
            verification_status: "pending",
          });
        })
      );
    }

    // Save marital document
    // if married = true
    if (maritalDocument) {
      await Document.create({
        application_id: application_id,
        title: "Marital Document",
        file_path: maritalDocument[0].filename,
        verification_status: "pending",
      });
    }

    if (hrLetter) {
      await Document.create({
        application_id: application_id,
        title: "HR Letter",
        file_path: hrLetter[0].filename,
        verification_status: "pending",
      });
    }

    // Save HR documents
    if (disability) {
      await Document.create({
        application_id: application_id,
        title: "Disability",
        file_path: disability[0].filename,
        verification_status: "pending",
      });
    }
    // change application status

    // Return success response
    res.status(200).json({ message: "Documents submitted successfully" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();

    res.status(200).json({ documents });
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

const verifyDocument = async (req, res) => {
  const { id } = req.params;
  try {
    // if faulty application documents -> either disqualify or update application and proceed
    // disability , birth certificate,
    // application status -> documents_verified or disqualified
    // check with application form
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  verifyDocument,
};

// what are all the files necesary
// Birth certificate
// marital certificate
// hr letter
//
