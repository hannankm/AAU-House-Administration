const Document = require("../models").Document;
const Application = require("../models").Application;
const User = require("../models").User;
const jwt = require("jsonwebtoken");

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
        where: { id: id },
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
      where: { id: id },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyDocuments = async (req, res) => {
  const { application_id } = req.params;
  const { verifiedDocuments, updateApplicationFields } = req.body;

  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.jwtSecret);
    const verifier_id = decodedToken.user_id;
    // Retrieve the application and all its documents
    const application = await Application.findByPk(application_id, {
      include: [{ model: Document, as: "documents" }],
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Verify each document
    for (const doc of application.documents || []) {
      const verifiedDocument = verifiedDocuments.find((d) => d.id === doc.id);

      if (verifiedDocument) {
        doc.verification_status = verifiedDocument.verified
          ? "verified"
          : "unverified";
        doc.verified_by = verifier_id;
        await doc.save();
        console.log(
          `Document ID: ${doc.id}, Status: ${doc.verification_status}`
        );

        if (!verifiedDocument.verified) {
          application.status = "disqualified";
        }
      }
    }

    // Update the application fields if specified
    if (updateApplicationFields && application.status !== "disqualified") {
      Object.keys(updateApplicationFields).forEach((field) => {
        application[field] = updateApplicationFields[field];
      });
      await application.save();
    }

    // Check if all documents are verified
    const allDocumentsVerified = (application.documents || []).every(
      (doc) => doc.verification_status === "verified"
    );
    if (allDocumentsVerified) {
      application.status = "documents verified";
      application.document_verified = true;
    }
    await application.save();

    res.json({ success: true, application });
  } catch (error) {
    console.error("Error verifying documents:", error);
    res.status(500).json({ error: error.message });
  }
};
const getApplicationsWithGroupedDocuments = async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const offset = (page - 1) * limit;
  const where = status ? { status } : {};
  try {
    const { rows: applications, count } = await Application.findAndCountAll({
      where,
      include: [
        { model: Document, as: "documents" },
        {
          model: User,
          as: "applicant",
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const applicationsWithGroupedDocuments = applications.map((application) => {
      const groupedDocuments = (application.documents || []).reduce(
        (groups, document) => {
          if (!groups[document.title]) {
            groups[document.title] = [];
          }
          groups[document.title].push(document);
          return groups;
        },
        {}
      );
      const { documents, ...applicationWithoutDocuments } =
        application.toJSON();

      return {
        ...applicationWithoutDocuments,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        groupedDocuments,
      };
    });

    res.json({ success: true, applications: applicationsWithGroupedDocuments });
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
  getApplicationsWithGroupedDocuments,
  verifyDocuments,
};
