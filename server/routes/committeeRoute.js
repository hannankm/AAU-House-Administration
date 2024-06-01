// routes/ComplaintRoutes.js
const express = require("express");
const router = express.Router();
const committeeController = require("../controllers/committee");

// Define routes

router.post("/primary", committeeController.invitePrimaryCommitteeMember);
router.post("/secondary", committeeController.inviteSecondaryCommitteeMember);
// router.get("/", committeeController);
// router.get("/:id", committeeController.getComplaintById);
// router.put("/", committeeController.updateComplaint);
// router.delete("/:id", committeeController.deleteComplaint);

module.exports = router;
