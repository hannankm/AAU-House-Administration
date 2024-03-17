const express = require("express");
const router = express.Router();
const houseController = require("../controllers/houseController");

// Define routes for CRUD operations
router.get("/", houseController.getAllHouses);
router.get("/empty", houseController.getEmptyHouses);
router.get("/:id", houseController.getHouseById);
router.post("/", houseController.createHouse);
router.put("/:id", houseController.updateHouse);
router.delete("/:id", houseController.deleteHouse);

// Define a route to get houses by status

module.exports = router;
