// routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/application");

// Define routes

router.post("/", applicationController.createApplication);
router.get("/", applicationController.getApplications);
router.get("/:id", applicationController.getApplicationById);
router.put("/:id", applicationController.updateApplication);
router.delete("/:id", applicationController.deleteApplication);

module.exports = router;
