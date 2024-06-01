// routes/auth.js

const express = require("express");
const authController = require("../controllers/authController");
const validInfo = require("../middlewares/validInfo");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", validInfo, authController.login);
router.get("/logout", authController.logout);
router.post("/change-password", authController.changePassword);
router.get("/profile", authController.getMyProfile);
router.put("/update-profile", authController.updateProfile);

module.exports = router;
