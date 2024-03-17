// routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document");

// Define routes

router.post("/", documentController.createDocument);
router.get("/", documentController.getDocuments);
router.get("/:id", documentController.getDocumentById);
router.put("/:id", documentController.updateDocument);
router.delete("/:id", documentController.deleteDocument);

module.exports = router;
