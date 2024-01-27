const express = require("express");
const router = express.Router();
const houseController = require("../controllers/houseController");

// Define routes for CRUD operations
router.get("/", houseController.getAllHouses);
router.get("/:id", houseController.getHouseById);
router.post("/", houseController.createHouse);
router.put("/:id", houseController.updateHouse);
router.delete("/:id", houseController.deleteHouse);

// Define a route to get houses by status
router.get("/houses/status/:status", houseController.getHousesByStatus);

module.exports = router;
