// routes/advertisementRoutes.js
const express = require("express");
const router = express.Router();
const advertisementController = require("../controllers/advertisementController");

// Define routes
router.post("/", advertisementController.createAdvertisement);
router.get("/", advertisementController.getAdvertisements);
router.get("/active", advertisementController.getActiveAdvertisment);
router.put("/post/:id", advertisementController.postAdvertisement);
router.get(
  "/director",
  advertisementController.viewAdsforAuthorizationByDirector
);
router.get(
  "/president",
  advertisementController.viewAdsforAuthorizationByPresident
);
router.get("/:id", advertisementController.getAdvertisementById);
router.put("/:id", advertisementController.updateAdvertisement);
router.delete("/:id", advertisementController.deleteAdvertisement);

router.put(
  "/director/authorize/:id",
  advertisementController.authorizeByDirector
);
router.put("/director/reject/:id", advertisementController.rejectByDirector);
router.put(
  "/president/authorize/:id",
  advertisementController.authorizeByPresident
);
router.put("/president/reject/:id", advertisementController.rejectByPresident);

// router.post("/authorize", advertisementController.authorizeAdvertisement);
router.get(
  "/status/:status",
  advertisementController.getAdvertisementsByStatus
);

module.exports = router;
