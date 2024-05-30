// routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document");
const { upload } = require("../utils/multer");

// Define routes
router.post(
  "/:application_id",
  upload.fields([
    { name: "childrenBirthCertificates", maxCount: 7 },
    { name: "maritalDocument", maxCount: 1 },
    { name: "hrLetter", maxCount: 1 },
    { name: "disability", maxCount: 1 },
  ]),
  documentController.createDocument
);
router.get("/", documentController.getDocuments);
router.get("/:id", documentController.getDocumentById);
router.put("/:id", documentController.updateDocument);
router.delete("/:id", documentController.deleteDocument);

module.exports = router;
