const express = require("express");
const router = express.Router();
const houseAdvertisementController = require("../controllers/houseAdController");

// Create a new house advertisement
router.post("/", houseAdvertisementController.createHouseAdvertisement);

// Get houses by advertisement ID
router.get(
  "/houses/:ad_id",
  houseAdvertisementController.getHousesByAdvertisementId
);

// Get advertisements by house ID
router.get(
  "/advertisements/:house_id",
  houseAdvertisementController.getAdvertisementsByHouseId
);

module.exports = router;
